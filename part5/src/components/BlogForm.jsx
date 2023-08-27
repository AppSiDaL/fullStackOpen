import { useState } from "react";
import blogService from "../services/blogs";
import propTypes from "prop-types";
const BlogForm = ({ setNotificationMessage, handleChange }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const createBlog = async (event) => {
    event.preventDefault();
    handleChange({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");

  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            id="titleInput"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            id="urlInput"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
BlogForm.propTypes = {
  setNotificationMessage: propTypes.func,
};
export default BlogForm;
