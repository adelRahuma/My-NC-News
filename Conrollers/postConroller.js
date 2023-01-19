const db = require("../db/connection");
const { postArticleMdl, updateVotes } = require("../modles/postModel");
const postArticle = (req, res, next) => {
  postArticleMdl(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
function patcharticle_id(req, res, next) {
  updateVotes(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = { postArticle, patcharticle_id };
