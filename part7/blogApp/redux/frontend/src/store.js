import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
const store = configureStore({
  reducer: {
    blogs:blogsReducer,
    user:userReducer,
    notification: notificationReducer,
    users:usersReducer
  },
})


export default store