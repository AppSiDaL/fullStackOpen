import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'
import { useUserDispatch } from '../hooks/UserContext'
import { useNotiDispatch } from '../hooks/NotificationContext'
const LoginForm = () => {
  const dispatchUser = useUserDispatch()
  const dispatchNoti=useNotiDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type:'SET',payload:user })
      setUsername('')
      setPassword('')
      const message={ text:`User ${user.username} logged`,type:'success' }
      dispatchNoti({ type:'SET',payload:message })
      setTimeout(() => {
        const message={ text:null,type:'success' }
        dispatchNoti({ type:'SET',payload:message })

      }, 5000)
    } catch (exception) {

      console.log('Wrong credentials')
    }
  }
  return (
    <div>
      <h2>Log in the App</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="usernameInput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="passwordInput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
