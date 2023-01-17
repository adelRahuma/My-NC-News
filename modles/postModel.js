const d = require("d");
const db = require("../db/connection");
function postArticleMdl(req) {
  const { article_id } = req.params;
  return db
    .query(
      "INSERT INTO comments (body, author, article_id, votes, created_at)VALUES($1,$2,$3,$4,$5) RETURNING *;",
      [
        req.body[0]["body"],
        req.body[0]["username"],
        article_id,
        0,
        "2023-01-11",
      ]
    )
    .then((result) => {
      return result.rows;
    })
    .catch(() => {
      return Promise.reject({ status: 404, msg: "not found" });
    });
}

module.exports = { postArticleMdl };
