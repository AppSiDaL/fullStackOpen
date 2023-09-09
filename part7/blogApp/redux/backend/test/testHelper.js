const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    url: 'https://example.com/intro-to-javascript',
    title: 'Introduction to JavaScript',
    author: 'John Smith',
    likes: 150
  },
  {
    url: 'https://example.com/css-tips',
    title: 'CSS Tips and Tricks',
    author: 'Jane Doe',
    likes: 75
  },
  {
    url: 'https://example.com/nodejs-express-api',
    title: 'Node.js and Express: Building APIs',
    author: 'Alice Johnson',
    likes: 200
  },
  {
    url: 'https://example.com/react-fundamentals',
    title: 'React Fundamentals',
    author: 'Michael Brown',
    likes: 120
  },
  {
    url: 'https://example.com/functional-programming',
    title: 'The Power of Functional Programming in Modern Web Development',
    author: 'Sophia Lee',
    likes: 12
  },
  {
    url: 'https://example.com/functional-programming',
    title: 'The Power of Functional Programming in Modern Web Development',
    author: 'Sophia Lee',
    likes: 12
  }
]
const initialUsers = [
  {
    username: 'root',
    name: 'gil',
    password: 'AppSiDaL6181'
  },
  {
    username: 'appsidal',
    name: 'appsidal',
    password: 'AppSiDaL6181'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}
