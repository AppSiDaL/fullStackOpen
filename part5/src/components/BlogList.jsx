import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
const BlogList = ({blogs,setBlogs,user}) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  blogs.sort((a,b)=>b.likes-a.likes)
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} setBlogs={setBlogs} blogs={blogs} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
