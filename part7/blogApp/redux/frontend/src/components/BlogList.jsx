import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as React from 'react'
import  Box  from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const newBlogs=[...blogs].sort((a, b) => b.likes - a.likes)

  const card =({ title,author,id }) => (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {author}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">
          <Link to={`/blogs/${id}`}>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              Explore {title} by {author}
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </React.Fragment>
  )
  return (
    <>
      {newBlogs.map((blog) => (
        <Box key={blog.id} sx={{ minWidth: 275 }}>
          <Card variant="outlined">{card(blog)}</Card>
        </Box>

      ))}
    </>
  )
}

export default BlogList
