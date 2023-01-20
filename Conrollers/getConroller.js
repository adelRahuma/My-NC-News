const {
  getTopicsMdl,
  getArticlesMdl,
  getarticle_cmntMdl,
  getarticle_idMdl,
  getUsersMdl,
} = require("../modles/getModel");

function getTopics(req, res, next) {
  getTopicsMdl()
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
  const { article_id, topic, sortBy, order } = req.query;
  getArticlesMdl(article_id, topic, sortBy, order)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function getarticle_id(req, res, next) {
  const { id } = req.params;
  getarticle_idMdl(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function getarticle_cmnt(req, res, next) {
  const { article_id } = req.params;
  getarticle_cmntMdl(article_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
function getUsers(req, res, next) {
  getUsersMdl()
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
