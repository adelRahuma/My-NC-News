const db = require("../db/connection");
const { FormatData } = require("../db/seeds/utils");

function getTopicsMdl(request) {
  return db
    .query("SELECT * FROM topics")
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getTopicsMdl };
