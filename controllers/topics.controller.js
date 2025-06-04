const { fetchTopics } = require("../models/topics.model");

const getTopics = function (req, res) {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

module.exports = { getTopics };
