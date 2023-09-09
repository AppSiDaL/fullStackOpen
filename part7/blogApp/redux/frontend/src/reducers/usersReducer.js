import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    remove(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
    appendUser(state, action) {
      return state=state.concat(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    }
  },
})
export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = content => {
  return async dispatch => {
    const newUser = await usersService.create(content)
    dispatch(appendUser(newUser))
    return newUser
  }
}


export const deleteUser = user => {
  return async dispatch => {
    await usersService.remove(user)
    dispatch(remove(user))
  }
}

export const { appendUser,setUsers,remove } = usersReducer.actions
export default usersReducer.reducer
