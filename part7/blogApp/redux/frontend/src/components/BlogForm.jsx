import { useState } from 'react'
import { TextField } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { Button } from '@mui/material'
const BlogForm = ({ handleChange }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const createBlog = async (event) => {
    event.preventDefault()
    handleChange({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            id="titleInput"
            onChange={({ target }) => setTitle(target.value)}
            name="Title"
            value={title}
            label="Title"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
            name="Author"
            value={author}
            label="Author"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="urlInput"
            onChange={({ target }) => setUrl(target.value)}
            name="Url"
            value={url}
            label="URL"
            variant="outlined"
          />
        </div>
        <Button type="submit" variant="outlined" endIcon={<CreateIcon />}>
          Create
        </Button>
      </form>
    </>
  )
}
export default BlogForm
