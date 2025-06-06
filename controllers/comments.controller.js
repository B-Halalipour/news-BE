const { insertComment } = require("../models/comments.model");

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

module.exports = { addCommentsByArticleId };
