const { getTopicsMdl } = require("../modles/getModel");

function getTopics(req, res, next) {
  getTopicsMdl(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function getapi(req, res, next) {
  res.status(200).send({ msg: "No content found" });
}
module.exports = { getTopics, getapi };
