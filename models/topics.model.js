const db = require("../db/connection");

const fetchTopics = function () {
  return db.query("SELECT * FROM topics;").then((result) => {
    return result.rows;
  });
};

module.exports = {fetchTopics};
