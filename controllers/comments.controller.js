const {
  insertComment,
  removeCommentById,
} = require("../models/comments.model");

function addCommentsByArticleId(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;
  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "bad request" });
  }
  if (!username || !body) {
    return res.status(400).send({ msg: "missing required fields" });
  }

  insertComment(article_id, username, body)
    .then((postedComment) => {
      res.status(201).send({ comment: postedComment });
    })
    .catch(next);
}

const deleteCommentById = function (req, res, next) {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
module.exports = { addCommentsByArticleId, deleteCommentById };
