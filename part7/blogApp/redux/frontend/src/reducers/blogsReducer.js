import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeFor(state, action) {
      const id = action.payload.id
      const blog = state.find((b) => b.id === id)
      const changedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      return state.map((b) => (b.id !== id ? b : changedBlog))
    },
    remove(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
    appendBlogs(state, action) {
      return state=state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    comment(state,action){
      const id = action.payload.id
      const blog = state.find((b) => b.id === id)
      const changedBlog = {
        ...blog,
        comments: action.payload.comments,
      }
      return state.map((b) => (b.id !== id ? b : changedBlog))
    }
  },
})
export const initializeBlogs = () => {
  return async dispatch => {
    const notes = await blogsService.getAll()
    dispatch(setBlogs(notes))
  }
}

export const createBlogs = content => {
  return async dispatch => {
    const newAnecdote = await blogsService.create(content)
    dispatch(appendBlogs(newAnecdote))
    return newAnecdote
  }
}

export const likedBlog = blog => {
  return async dispatch => {
    const modifiedBlog = await blogsService.modify(blog)
    dispatch(likeFor(modifiedBlog))
  }
}
export const commentBlog = blog => {
  return async dispatch => {
    const modifiedBlog = await blogsService.comment(blog)
    dispatch(comment(modifiedBlog))
  }
}
export const deleteBlog = blog => {
  return async dispatch => {
    await blogsService.remove(blog)
    dispatch(remove(blog))
  }
}

export const { appendBlogs,setBlogs,likeFor,remove,comment } = blogsReducer.actions
export default blogsReducer.reducer
