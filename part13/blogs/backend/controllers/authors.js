const router = require("express").Router();

const { Blog } = require("../models");
const sequelize = require('sequelize')

const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    raw: true,
  });

  const formattedAuthors = blogs.map((blog) => ({
    author: blog.author,
    articles: blog.articles.toString(),
    likes: blog.likes.toString(),
  }));

  res.json(formattedAuthors);
});

module.exports = router;
