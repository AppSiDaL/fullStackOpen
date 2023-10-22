const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Blog } = require("../models");
const { User } = require("../models");
const { SECRET } = require("../utils/config");
const { Op } = require("sequelize");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res, next) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["user_id"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.get("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  blog.likes = req.body.likes;
  await blog.save();
  res.json(blog);
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  console.log(req.decodedToken);
  const decodedToken = req.decodedToken;
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findByPk(decodedToken.id);
  const blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  console.log(blog.userId);
  if (blog.userId.toString() === user.id.toString()) {
    await Blog.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  }
  res.status(400).json({ error: "User does not have the privileges" }).end();
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  console.log(req.body);
  return res.json(blog);
});

module.exports = router;
