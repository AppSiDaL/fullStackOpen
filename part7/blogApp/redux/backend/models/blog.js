const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  url: String,
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  comments: []
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
