const handlePostgressErrors = function (err, req, res, next) {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};
const handleCustomErrors = function (err, req, res, next) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleServerErrors = function (err, req, res, next) {
  console.error(err);
  res.status(500).send({ msg: "Somthing broke" });
};

module.exports = {
  handlePostgressErrors,
  handleServerErrors,
  handleCustomErrors,
};
