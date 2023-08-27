import { useState } from "react";
import blogService from "../services/blogs";
import propTypes from "prop-types";
const Blog = ({ blog, blogs, likeCall, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const handleLike = async (id) => {
    const modifiedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const response = await blogService.modify(id, modifiedBlog);
      const newBlogs = blogs.map((b) => (b.id === response.id ? response : b));
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id);
        const newBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(newBlogs);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (showDetails) {
    return (
      <div className="blog" style={blogStyle}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={() => handleShowDetails()}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span>{blog.likes}</span>{" "}
          <button onClick={likeCall ? likeCall : () => handleLike(blog.id)}>
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.username == user.username && (
          <div>
            <button onClick={() => handleDelete(blog)}>delete</button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => handleShowDetails()}>Show</button>
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
};

export default Blog;
