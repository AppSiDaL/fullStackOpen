const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./testHelper')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const login = async () => {
  const user = {
    username: 'loginUser',
    name: 'gil',
    password: 'AppSiDaL6181'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(201)

  const res = await api
    .post('/api/login')
    .send(user)

  return res.body.token
}

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArrayU = userObjects.map(user => user.save())
  await Promise.all(promiseArrayU)

  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 10000)

describe('Blogs are returned correctly', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(c => c.title)
    expect(contents).toContain('CSS Tips and Tricks')
  })
})
describe('Viewing specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })

  test('404 if blog does not exist', async () => {
    await api
      .get('/api/blogs/64e0f4061bd3965d99c0f499')
      .expect(404)
  })

  test('400 status if blog id is malformed', async () => {
    const response = await api
      .get('/api/blogs/invalidExample')
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual({ error: 'malformatted id' })
  })
})

describe('Blog adition', () => {
  test('a valid blog can be added', async () => {
    const token = await login()
    const newBlog = {
      title: 'async/await simplifies making calls',
      author: 'AppSiDaL',
      url: 'www.example.com',
      likes: 100
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('async/await simplifies making calls')
  })

  test('title || url validation', async () => {
    let newBlog = {
      author: 'AppSiDaL',
      url: 'www.example.com'
    }
    const token = await login()
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    newBlog = {
      author: 'AppSiDaL',
      url: 'www.example.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
describe('test deletion', () => {
  test('a blog can be deleted', async () => {
    const token = await login()

    const newBlog = {
      title: 'async/await simplifies making calls',
      author: 'AppSiDaL',
      url: 'www.example.com',
      likes: 100
    }
    const blogToDelete = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.body.title)
  })
})

describe('Checking 401 unauthorized', () => {
  test('unauthorized', async () => {
    const newBlog = {
      title: 'async/await simplifies making calls',
      author: 'AppSiDaL',
      url: 'www.example.com',
      likes: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain('async/await simplifies making calls')
  })
})

describe('Blog Information can be changed', () => {
  test('changing likes', async () => {
    const blogs = await helper.blogsInDb()
    const blogToModify = blogs[0]
    const modifiedBlog = { ...blogToModify, likes: 911 }
    const response = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifiedBlog)

    expect(response.body.likes).toBe(modifiedBlog.likes)
  })
})

describe('Property validations', () => {
  test('is "id" the identifier?', async () => {
    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart[0].id).toBeDefined()
  })

  test('likes property validaion', async () => {
    const newBlog = {
      title: 'supertest are so useful',
      author: 'AppSiDaL',
      url: 'www.example.com/supertest'
    }
    const token = await login()
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('Username and PassWord Post', () => {
  test('Username and password must be given', async () => {
    const usersAtStart = await helper.usersInDb()

    let newUser = {
      name: 'Superuser',
      password: 'salainen'
    }

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')

    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)

    newUser = {
      username: 'Superuser',
      name: 'salainen'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `password` is required.')

    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('Username and password min length', async () => {
    const usersAtStart = await helper.usersInDb()

    let newUser = {
      username: 'as',
      name: 'Superuser',
      password: 'salainen'
    }

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3).')
    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
    newUser = {
      username: 'Superss',
      name: 'Superuser',
      password: 'as'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short')
    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
