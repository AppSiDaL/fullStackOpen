import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { commentBlog,likedBlog } from '../reducers/blogsReducer'
import { Link,useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { IconButton } from '@mui/material'
import { deleteBlog } from '../reducers/blogsReducer'
import DeleteIcon from '@mui/icons-material/Delete'
import { setNotification } from '../reducers/notificationReducer'
const Blog = ({ blog }) => {
  const [comment,setComment] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSendComment=() => {
    const blogToComment={
      id:blog.id,comment:comment
    }
    dispatch(commentBlog( blogToComment ))
    setComment('')
  }
  const user= useSelector(({ user }) => user)
  const handleDelete=blog => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification({    message: `Blog ${blog.title} removed`,
      type: 'success' },5000))
    navigate('/')
  }
  if (!blog) {
    return null
  }
  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <Link href={blog.url} underline="hover">{blog.url}</Link>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={() => dispatch(likedBlog(blog))}>
            like
        </button>
      </div>
        added by {blog.user.username}
      <div>
        {blog.user === user.id && (
          <IconButton onClick={() => handleDelete(blog)} aria-label="send">
            <DeleteIcon />
          </IconButton>
        )}
        <h3>
            comments
        </h3>
        <TextField label="Comment" value={comment} color="secondary"onChange={({ target }) => setComment(target.value)} />
        <IconButton onClick={handleSendComment} aria-label="send">
          <SendIcon />
        </IconButton>

        <ul>
          {blog.comments.map((comment,index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
