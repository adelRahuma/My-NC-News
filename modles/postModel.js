const db = require("../db/connection");
function postArticleMdl(req) {
  const { article_id } = req.params;
  return db
    .query(
      "INSERT INTO comments (body, author, article_id, votes)VALUES($1,$2,$3,$4) RETURNING *;",
      [req.body[0]["body"], req.body[0]["username"], article_id, 0]
    )
    .then((result) => {
      return result.rows;
    })
    .catch(() => {
      return Promise.reject({ status: 404, msg: "not found" });
    });
}
function patcharticle_idMdl(req) {
  const { article_id } = req.params;
  console.log(req);
  return db
    .query("UPDATE articles SET votes += $1 RETURNING *;", [article_id])
    .then((result) => {
      return result.rows;
    })
    .catch(() => {
      return Promise.reject({ status: 404, msg: "not found" });
    });
}
module.exports = { postArticleMdl, patcharticle_idMdl };
