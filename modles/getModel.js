const db = require("../db/connection");
const { FormatData } = require("../db/seeds/utils");

function getTopicsMdl(request) {
  return db.query("SELECT * FROM topics").then((result) => {
    if (result.rows === 0)
      return Promise.reject({ status: 404, msg: "not found" });
    else return result.rows;
  });
}
function getArticlesMdl(request) {
  let queryString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url,  COUNT(comments.body) AS comment_count
  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id ORDER BY created_at  DESC;`;

  return db
    .query(queryString)
    .then((result) => {
      return result.rows;
    })
    .catch(() => {
      return Promise.reject({
        status: 400,
        msg: "Please sort by acceptable parameter",
      });
    });
}
function getarticle_idMdl(id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then((result) => {
      let Obj = {};
      for (let i = 0; i < result.rows.length; i++) {
        Object.assign(Obj, result.rows[i]);
      }
      if (Obj === {}) return Promise.reject({ status: 404, msg: "not found" });
      else return Obj;
    });
}
function getarticle_cmntMdl(req) {
  const { article_id } = req.params;
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [article_id]
    )
    .then((result) => {
      if (result.rows === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      else return result.rows;
    });
}
function getUsersMdl(req) {
  return db
    .query("SELECT * FROM users")
    .then((result) => {
      if (result.rowCount === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      else return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = {
  getTopicsMdl,
  getArticlesMdl,
  getarticle_cmntMdl,
  getarticle_idMdl,
  getUsersMdl,
};
