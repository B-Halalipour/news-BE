const { fetchUsers } = require("../models/users.model");

const getUsers = function (req, res) {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};
module.exports = { getUsers };
