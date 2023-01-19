const {
  getTopicsMdl,
  getArticlesMdl,
  getarticle_cmntMdl,
  getarticle_idMdl,
  getUsersMdl,
} = require("../modles/getModel");

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
function getArticles(req, res, next) {
  const { sortBy, order } = req.query;

  getArticlesMdl(req, sortBy, order)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function getarticle_id(req, res, next) {
  const { id } = req.params;

  getarticle_idMdl(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function getarticle_cmnt(req, res, next) {
  getarticle_cmntMdl(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
function getUsers(req, res, next) {
  getUsersMdl(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
module.exports = {
  getTopics,
  getapi,
  getArticles,
  getarticle_cmnt,
  getarticle_id,
  getUsers,
};
