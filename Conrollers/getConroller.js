const {
  getTopicsMdl,
  getArticlesMdl,
  getarticle_cmntMdl,
  getarticle_idMdl,
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
  getArticlesMdl(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
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
module.exports = {
  getTopics,
  getapi,
  getArticles,
  getarticle_cmnt,
  getarticle_id,
};
