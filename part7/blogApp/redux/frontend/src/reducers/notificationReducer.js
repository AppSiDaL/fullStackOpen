import { createSlice } from '@reduxjs/toolkit'
const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null
  },
  reducers: {
    notificationChange(state, action) {
      return state = action.payload
    },
  },
})
export const setNotification = (noti,time) => {
  return  dispatch => {
    dispatch(notificationChange(noti))
    setTimeout(() => {
      dispatch(
        notificationChange({
          message: null,
          type: null,
        })
      )
    }, time)
  }
}
export const { notificationChange } = notificationReducer.actions
export default notificationReducer.reducer
