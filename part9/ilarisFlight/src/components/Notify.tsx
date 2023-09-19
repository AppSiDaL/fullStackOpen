import { Notification } from "../types";
interface NotificationProps {
  notification: Notification;
}
const Notify = ({ notification }: NotificationProps) => {
  if (notification.class !== "") {
    return <div className={notification.class}>{notification.message}</div>;
  }
  return null;
};

export default Notify;
