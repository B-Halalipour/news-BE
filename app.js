const express = require("express");
const path = require("path");
const app = express();

const cors = require('cors');


// Middleware
app.use(express.json());
app.use(cors());
// Serve static HTML docs from /public
app.use(express.static(path.join(__dirname, "public")));

// Routes & Controllers
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  addCommentsByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controller");

// Error handling middleware
const {
  handlePostgressErrors,
  handleServerErrors,
  handleCustomErrors,
} = require("./errors");

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", addCommentsByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getUsers);
app.delete("/api/comments/:comment_id", deleteCommentById);

// Error handling middleware
app.use(handlePostgressErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

//make Render to rebuild

module.exports = app;
