import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    url: "https://example.com/intro-to-javascript",
    title: "Introduction to JavaScript",
    author: "John Smith",
    likes: 155,
  };
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Introduction to JavaScript John Smith");
  expect(div).not.toHaveTextContent("155");
  expect(div).not.toHaveTextContent("https://example.com/intro-to-javascript");
});
test("clicking the button calls event handler once", async () => {
  const blog = {
    url: "https://example.com/intro-to-javascript",
    title: "Introduction to JavaScript",
    author: "John Smith",
    likes: 155,
    user: {
      username: "root",
      name: "gil",
      id: "64e298cf3e8d6e57f620ae47",
    },
    id: "64e29bb06243cf307140f7f6",
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("Show");
  await user.click(button);
  const detailsDiv = screen.getByText(
    "https://example.com/intro-to-javascript"
  );
  expect(detailsDiv).toBeInTheDocument();
  const likesDiv = screen.getByText("155");
  expect(likesDiv).toBeInTheDocument();
});

test("clicking like button twice calls event handler twice", async () => {
  const blog = {
    url: "https://example.com/intro-to-javascript",
    title: "Introduction to JavaScript",
    author: "John Smith",
    likes: 155,
    user: {
      username: "root",
      name: "gil",
      id: "64e298cf3e8d6e57f620ae47",
    },
    id: "64e29bb06243cf307140f7f6",
  };

  const mockHandleLike = jest.fn();

  render(<Blog blog={blog} likeCall={mockHandleLike} />);
  const user = userEvent.setup();
  const button = screen.getByText("Show");
  await user.click(button);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandleLike).toHaveBeenCalledTimes(2);
});

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleChange={createBlog} />);
  const blog = {
    url: "https://example.com/intro-to-javascript",
    title: "Introduction to JavaScript",
    author: "John Smith",
    likes: 155,
    id: "64e29bb06243cf307140f7f6",
  };

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  await user.type(inputs[0], "Introduction to JavaScript");
  await user.type(inputs[1], "John Smith");
  await user.type(inputs[2], "https://example.com/intro-to-javascript");

  await user.click(sendButton);
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("Introduction to JavaScript");
  expect(createBlog.mock.calls[0][0].author).toBe("John Smith");
  expect(createBlog.mock.calls[0][0].url).toBe("https://example.com/intro-to-javascript");

});
