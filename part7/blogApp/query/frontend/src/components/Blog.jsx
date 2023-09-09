import { useState } from 'react'
import blogService from '../services/blogs'
import { useUserValue } from '../hooks/UserContext'
import { useMutation,useQueryClient } from '@tanstack/react-query'
const Blog = ({ blog, likeCall }) => {

  const [showDetails, setShowDetails] = useState(false)
  const user = useUserValue()
  const queryClient=useQueryClient()
  const updateBlogMutation = useMutation(blogService.modify, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }
  if (showDetails) {
    return (
      <div className="blog" style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => handleShowDetails()}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span>{blog.likes}</span>{' '}
          <button onClick={likeCall ? likeCall : () => updateBlogMutation.mutate({ ...blog, likes: blog.likes+1 })}>
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.id === user.id && (
          <div>
            <button onClick={() => handleDelete(blog)}>delete</button>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => handleShowDetails()}>Show</button>
    </div>
  )
}


export default Blog
