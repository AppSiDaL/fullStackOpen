import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user= await dispatch(loginUser({
        username,
        password,
      }))
      setUsername('')
      setPassword('')

      dispatch(
        setNotification(
          {
            message: 'Welcome ' + user.username,
            type: 'success',
          },
          5000,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: 'Wrong Credentials',
            type: 'error',
          },
          5000,
        ),
      )

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
