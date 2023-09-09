import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
const BlogList = () => {

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false
  })
  if ( blogs.isLoading ) {
    return <div>loading data...</div>
  }
  const newBlogs=[...blogs.data].sort((a, b) => b.likes - a.likes)
  return (
    <>
      {newBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  )
}

export default BlogList
