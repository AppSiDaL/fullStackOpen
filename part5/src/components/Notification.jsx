import "../main.css";
import PropTypes from "prop-types";
const Notification = ({ notificationMessage }) => {
  if (notificationMessage.message === null) {
    return null;
  }

  return (
    <div className={notificationMessage.class}>
      {notificationMessage.message}
    </div>
  );
};

Notification.propTypes = {
  notificationMessage: PropTypes.object.isRequired,
};

export default Notification;
