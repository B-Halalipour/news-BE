const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
} = require("../models/articles.model");
const getArticles = function (req, res) {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

const getArticleById = function (req, res, next) {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleId = function (req, res, next) {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticles, getArticleById, getCommentsByArticleId };
