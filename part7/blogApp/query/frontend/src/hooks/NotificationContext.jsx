import { createContext, useReducer,useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return state=action.payload
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { text:null,type:null })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotiValue = () => {
  const notiAndDispatch = useContext(NotificationContext)
  return notiAndDispatch[0]
}
export const useNotiDispatch = () => {
  const notiAndDispatch = useContext(NotificationContext)
  return notiAndDispatch[1]
}

export default NotificationContext