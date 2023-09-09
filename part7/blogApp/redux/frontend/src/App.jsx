import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import Navbar from './components/Navbar'
import { useEffect,useMemo } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { Link,Routes,Route,useMatch } from 'react-router-dom'
import BlogsScreen from './screens/BlogsScreen'
import UsersScreen from './screens/UsersScreen'
import User from './components/User'
import { getUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogsReducer'
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(getUsers())
    dispatch(initializeBlogs())
  }, [])


  const user= useSelector(({ user }) => user)
  const users= useSelector(({ users }) => users)
  const blogs=useSelector(({ blogs }) => blogs)
  const matchUser = useMatch('/users/:id')
  const userTo = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null
  const matchBlog = useMatch('/blogs/:id')
  const blogTo = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!user && <LoginForm/>}
        {user && (
          <div>
            <Navbar/>
            <Notification />
            <div>
              <Routes>
                <Route path="/users/:id" element={<User user={userTo}/>} />
                <Route path="/blogs/:id" element={<Blog blog={blogTo}/>} />
                <Route path="/" element={<BlogsScreen />} />
                <Route path='/users' element={<UsersScreen/>}/>
              </Routes>
            </div>
          </div>
        )}
      </ThemeProvider>

    </div>
  )
}

export default App
