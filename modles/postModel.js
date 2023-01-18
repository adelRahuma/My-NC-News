const db = require("../db/connection");
function postArticleMdl(req) {
  const { article_id } = req.params;
  return db
    .query(
      "INSERT INTO comments (body, author, article_id, votes,created_at)VALUES($1,$2,$3,$4,$5) RETURNING *;",
      [
        req.body[0]["body"],
        req.body[0]["username"],
        article_id,
        0,
        "2023-01-11T00:00:00.000Z",
      ]
    )
    .then((result) => {
      if (result.rows === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      else return result.rows;
    });
}

function updateVotes(req) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return db
    .query(
      `UPDATE articles SET votes = votes + ${inc_votes} WHERE article_id = ${article_id} RETURNING *;`
    )

    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return result.rows;
      }
    });
}

module.exports = { postArticleMdl, updateVotes };
