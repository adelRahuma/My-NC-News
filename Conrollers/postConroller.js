const db = require("../db/connection");
const { postArticleMdl, patcharticle_idMdl } = require("../modles/postModel");
const postArticle = (req, res, next) => {
  postArticleMdl(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
function patcharticle_id(req, res, next) {
  updateVotes(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
module.exports = { postArticle, patcharticle_id };
