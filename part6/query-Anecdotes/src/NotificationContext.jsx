import { createContext, useReducer, useContext } from "react";

const notificationReducer = (
  state = {
    message: null,
    type: null,
  },
  action
) => {
  switch (action.type) {
    case "CHANGE":
      return (state = action.payload);
    case "CLEAN":
      return (state = {
        message: null,
        type: null,
      });
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[1];
};

export default NotificationContext;
