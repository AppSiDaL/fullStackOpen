import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Notification from "./Notification";
import PropTypes from "prop-types";
const LoginForm = ({
  setUser,
  setNotificationMessage,
  notificationMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      const message = {
        message: "Welcome " + user.username,
        class: "success",
      };
      setNotificationMessage(message);
      setTimeout(() => {
        const message = {
          message: null,
          class: null,
        };
        setNotificationMessage(message);
      }, 5000);
    } catch (exception) {
      const message = {
        message: "Wrong Credentials",
        class: "error",
      };
      setTimeout(() => {
        const message = {
          message: null,
          class: null,
        };
        setNotificationMessage(message);
      }, 5000);
      setNotificationMessage(message);
      console.log("Wrong credentials");
    }
  };
  return (
    <div>
      <h2>Log in the App</h2>
      <Notification notificationMessage={notificationMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="usernameInput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="passwordInput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  notificationMessage: PropTypes.object.isRequired,
};
export default LoginForm;
