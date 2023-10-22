const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readingList')
const ActiveSession = require('./activeSession')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readinglists' })

module.exports = { Blog, User, Readinglist, ActiveSession }