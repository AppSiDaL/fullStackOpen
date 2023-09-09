import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
import blogService from '../services/blogs'
const usersReducer = createSlice({
  name: 'user',
  initialState:null,
  reducers: {
    setUser(state, action) {
      return state = action.payload
    },
  },
})

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}
export const loginUser = ({ username,password }) => {
  return async dispatch => {
    const user = await login.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
    return user
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
}

export const { setUser } = usersReducer.actions
export default usersReducer.reducer
