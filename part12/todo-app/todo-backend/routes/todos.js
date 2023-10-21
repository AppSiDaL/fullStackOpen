const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

async function setKey(key, value) {
  try {
    await setAsync(key, value);
    console.log("Key set successfully.");
  } catch (error) {
    console.error("Error setting the key:", error);
  }
}
async function getKey(key) {
  try {
    const value = await getAsync(key);
    console.log("Value:", value);
    return value;
  } catch (error) {
    console.error("Error getting the key:", error);
  }
}


/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const value = await getKey("added");
  console.log(value)
  setKey("added", parseInt(value) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);
  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = await Todo.updateOne(req.todo.id, {
    text: req.body.text,
    done: req.body.done,
  });
  res.send(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
