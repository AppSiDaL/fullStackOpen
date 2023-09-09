const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const numbers = (blogs.map((blog) => blog.likes))
  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
  return sum
}

const findFavorite = (blogs) => {
  const blogWithMostLikes = blogs.reduce((maxLikesBlog, currentBlog) => {
    return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog
  }, blogs[0])
  return blogWithMostLikes
}

const findMostPopularAuthor = (blogs) => {
  const author = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .maxBy('blogs')

  return author
}

const findMostLikedAuthor = (blogs) => {
  const author = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .maxBy('likes')
  return author
}

module.exports = {
  dummy, totalLikes, findFavorite, findMostPopularAuthor, findMostLikedAuthor
}
