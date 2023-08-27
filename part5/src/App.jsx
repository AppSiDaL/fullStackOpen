import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";
const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    class: null,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
  };
  const handleChange = async (blogObject) => {

    try {
        const res = await blogService.create(blogObject)
        setBlogs(blogs.concat(res))

        setNotificationMessage({
            message: `New blog ${res.title} created`,
            class: "success"
        })

        blogFormRef.current.toggleVisibility()
        const message = {
          message: null,
          class: null,
        };
        setTimeout(() => {
          setNotificationMessage(message)
        }, 5000)

    } catch (error) {
        console.log(error)
    }
}
  const blogForm = () => (
    <Togglable buttonLabel="Create New" ref={blogFormRef}>
      <BlogForm
        setNotificationMessage={setNotificationMessage} handleChange={handleChange}
      />
    </Togglable>
  );
  return (
    <div>
      {!user && (
        <LoginForm
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
          notificationMessage={notificationMessage}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification notificationMessage={notificationMessage} />
          <div>
            {user.username} logged in
            <button onClick={() => logOut()}>Log out</button>
          </div>
          {blogForm()}
          <BlogList blogs={blogs} user={user} setBlogs={setBlogs}/>
        </div>
      )}
    </div>
  );
};

export default App;
