const {fetchArticles} = require("../models/articles.model");
const getArticles = function (req, res) {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = { getArticles };
