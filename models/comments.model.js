const db = require("../db/connection");

function insertComment(article_id, username, body) {
  const id = Number(article_id);
  return db
    .query(
      `INSERT INTO COMMENTS (author, body, article_id)
        VALUES($1, $2, $3)
        RETURNING *;`,
      [username, body, article_id]
    )
    .then((result) => result.rows[0]);
}
const removeCommentById = function (comment_id) {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    });
};
module.exports = { insertComment, removeCommentById };
