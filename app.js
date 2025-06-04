const express = require("express");
const app = express();
const db = require("./db/connection");
const endpoints = require("./endpoints.json");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/users", getUsers);
module.exports = app;
