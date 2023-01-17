const db = require("../db/connection");
const { postArticleMdl } = require("../modles/postModel");
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

module.exports = { postArticle };
