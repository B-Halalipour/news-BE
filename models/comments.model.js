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
module.exports = { insertComment };
