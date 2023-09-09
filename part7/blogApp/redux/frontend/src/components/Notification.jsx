import '../main.css'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'
const Notification = () => {
  const { message, type } = useSelector(({ notification }) => notification)
  if (message === null) {
    return null
  }

  return (
    <Alert variant="outlined" severity={type}>
      {message}
    </Alert>
  )
}


export default Notification
