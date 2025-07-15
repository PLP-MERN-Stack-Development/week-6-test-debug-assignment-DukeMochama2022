const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Example route (replace with your actual routes)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO: Import and use your actual API routes here
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

module.exports = app;
