const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleVotes,
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

const patchArticleById = function (req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    return res.status(400).send({ msg: "Invalid or missing inc_votes" });
  }
  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).send({ msg: "Article not found" });
      }

      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
};
