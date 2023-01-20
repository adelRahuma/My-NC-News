const db = require("../db/connection");
function postArticleMdl(article_id, username, body) {
  return db
    .query(
      "INSERT INTO comments (body, author, article_id, votes,created_at)VALUES($1,$2,$3,$4,$5) RETURNING *;",
      [body, username, article_id, 0, "2023-01-11T00:00:00.000Z"]
    )
    .then((result) => {
      console.log(result.rows);
      if (result.rows === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      else return result.rows;
    });
}

function updateVotes(article_id, inc_votes) {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2  RETURNING *;`,
      [inc_votes, article_id]
    )

    .then((result) => {
      if (result.rows.length === 0)
        return Promise.reject({ status: 400, msg: "Article not found" });
      else return result.rows;
    });
}

module.exports = { postArticleMdl, updateVotes };
