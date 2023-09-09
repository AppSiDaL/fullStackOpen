import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { useUserDispatch, useUserValue } from './hooks/UserContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotiDispatch } from './hooks/NotificationContext'
const App = () => {
  const dispatchUser = useUserDispatch()
  const user = useUserValue()
  const blogFormRef = useRef()
  const dispatchNoti=useNotiDispatch()
  const queryClient =  useQueryClient()
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleChange = async (blogObject) => {
    try {

      newBlogMutation.mutate(blogObject)
      const message = { text: `Blog ${blogObject.title} created`, type: 'success' }
      dispatchNoti({ type: 'SET', payload: message })
      setTimeout(() => {
        const message = { text: null, type: 'success' }
        dispatchNoti({ type: 'SET', payload: message })
      }, 5000)

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
      {!user && <LoginForm />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.username} logged in
            <button onClick={() => dispatchUser({ type: 'CLEAR' })}>
              Log out
            </button>
          </div>
          {blogForm()}
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
