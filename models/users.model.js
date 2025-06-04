const db = require("../db/connection");

const fetchUsers = function () {
  return db.query("SELECT * FROM users;").then(({ rows: users }) => {
    return users;
  });
};

module.exports = { fetchUsers };
