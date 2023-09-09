import '../main.css'
import { useNotiValue } from '../hooks/NotificationContext'
const Notification = () => {
  const { text, type } = useNotiValue()
  if (text === null) {
    return null
  }

  return (
    <div className={type}>
      {text}
    </div>
  )
}


export default Notification
