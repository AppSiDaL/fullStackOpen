import React from 'react'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { createBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import BlogForm from '../components/BlogForm'
const BlogsScreen = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleChange = async (blogObject) => {
    try {
      const res= await dispatch(createBlogs(blogObject))
      dispatch(
        setNotification(
          {
            message: `New blog ${res.title} created`,
            type: 'success',
          },
          5000,
        ),
      )

      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel="Create New" ref={blogFormRef}>
      <BlogForm handleChange={handleChange} />
    </Togglable>
  )
  return (
    <div>
      {blogForm()}
      <BlogList />
    </div>
  )
}

export default BlogsScreen
