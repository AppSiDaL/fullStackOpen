const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../utils/config");
const ReadingList = require("../models/readingList");
const User = require("../models/user");

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

router.post("/", async (req, res, next) => {
  const blog = await ReadingList.create({
    ...req.body,
  });
  console.log(req.body);
  return res.json(blog);
});

router.put("/:id",tokenExtractor ,async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    const blog = await ReadingList.findByPk(req.params.id);
    console.log(JSON.stringify(blog))
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (blog.userId !== decodedToken.id) {
      return res.status(403).json({ error: "Permission denied" });
    }
    blog.is_read = req.body.read;
    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
