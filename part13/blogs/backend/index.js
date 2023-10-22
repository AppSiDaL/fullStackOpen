const express = require("express");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/readingList");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blog");
require("express-async-errors");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists",readingListRouter)


app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
