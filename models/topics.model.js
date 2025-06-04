const db = require("../db/connection");

const fetchTopics = function () {
  return db.query("SELECT * FROM topics;").then(({ rows: topics }) => {
    return topics;
  });
};

module.exports = { fetchTopics };
