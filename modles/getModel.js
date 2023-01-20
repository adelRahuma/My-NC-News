const db = require("../db/connection");
const { FormatData } = require("../db/seeds/utils");

function getTopicsMdl() {
  return db.query("SELECT * FROM topics").then((result) => {
    if (result.rows === 0)
      return Promise.reject({ status: 404, msg: "not found" });
    else return result.rows;
  });
}
function getArticlesMdl(
  article_id,
  topic,
  sortBy = "created_at",
  order = "DESC"
) {
  if (!topic) {
    //for Task-4
    let queryString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url,  COUNT(comments.body) AS comment_count
  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id ORDER BY ${sortBy}  ${order};`;

    return db.query(queryString).then((result) => {
      if (result.rows.length === 0)
      return Promise.reject({ status: 400, msg: "not found" });  
      else return result.rows;
    });
  } else if (topic !== undefined) {
    //for Task-10
    return db
      .query(
        `SELECT * FROM articles WHERE topic = $1 ORDER BY ${sortBy} ${order}; `,
        [topic]
      )
      .then((result) => {

        //if (result.rows.length === 0) {
         // return //Promise.reject({ status: 404, msg: "Path not found" });  <=== According to the tutor Recommendations
        // } else {
         return result.rows;
        // }
      });
  } else if (article_id !== undefined) {
  }
}
function getarticle_idMdl(id) {
  if (!isNaN(id)) {
    return db
      .query(`SELECT * FROM articles WHERE article_id =$1;`, [id])
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "not found" });
        } else return result.rows;
      });
  } else {
    return db
      .query(
        `SELECT * FROM articles WHERE topic = $1 ORDER BY article_id ASC; `,
        [id]
      )
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Path not found" });
        } else {
          return result.rows;
        }
      });
  }
}
function getarticle_cmntMdl(article_id) {
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
function getUsersMdl() {
  return db.query("SELECT * FROM users").then((result) => {
    if (result.rowCount === 0)
      return Promise.reject({ status: 404, msg: "user does not exist" });
    else return result.rows;
  });
}
module.exports = {
  getTopicsMdl,
  getArticlesMdl,
  getarticle_cmntMdl,
  getarticle_idMdl,
  getUsersMdl,
};
