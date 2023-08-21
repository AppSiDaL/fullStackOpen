const listHelper = require('../utils/listHelper')
const blogs = [
  {
    title: 'Introduction to JavaScript',
    author: 'John Smith',
    url: 'https://example.com/intro-to-javascript',
    likes: 150
  },
  {
    title: 'CSS Tips and Tricks',
    author: 'Jane Doe',
    url: 'https://example.com/css-tips',
    likes: 75
  },
  {
    title: 'Node.js and Express: Building APIs',
    author: 'Alice Johnson',
    url: 'https://example.com/nodejs-express-api',
    likes: 200
  },
  {
    title: 'React Fundamentals',
    author: 'Michael Brown',
    url: 'https://example.com/react-fundamentals',
    likes: 120
  },
  {
    title: 'React Basics',
    author: 'Michael Brown',
    url: 'https://example.com/react-basics',
    likes: 100
  },
  {
    title: 'Best Practices for Database Design',
    author: 'Emily Williams',
    url: 'https://example.com/database-design',
    likes: 90
  }
]
const blogs1 = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total Likes', () => {
  test('Sum likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(735)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('Blog with most likes', () => {
  test('Find Favorite 1', () => {
    const result = listHelper.findFavorite(blogs)
    expect(result).toEqual({
      title: 'Node.js and Express: Building APIs',
      author: 'Alice Johnson',
      url: 'https://example.com/nodejs-express-api',
      likes: 200
    })
  })
  test('find favorite 2', () => {
    const result = listHelper.findFavorite(listWithOneBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })
})

describe('Most popular Author', () => {
  test('Find Most popular Author 1', () => {
    const result = listHelper.findMostPopularAuthor(blogs)
    expect(result).toEqual({
      author: 'Michael Brown',
      blogs: 2
    })
  })
  test('Find Most popular Author 2', () => {
    const result = listHelper.findMostPopularAuthor(blogs1)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('Most liked Author', () => {
  test('Most liked Author1', () => {
    const result = listHelper.findMostLikedAuthor(blogs)
    expect(result).toEqual({
      author: 'Michael Brown',
      likes: 220
    })
  })
  test('Most liked Author2', () => {
    const result = listHelper.findMostLikedAuthor(blogs1)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
