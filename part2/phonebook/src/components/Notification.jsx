import React from "react";

const Notification = ({ message, clase }) => {
  if (message === null) {
    return null;
  }
  console.log(clase)
  return <div className={clase}>{message}</div>;
};

export default Notification;
