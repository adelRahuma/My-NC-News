const { response } = require("express");
const express = require("express");
const {
  getTopics,
  getapi,
  getArticles,
  getarticle_cmnt,
  getarticle_id,
} = require("./Conrollers/getConroller");
const { postArticle } = require("./Conrollers/postConroller");
const app = express();
app.use(express.json());
app.get("/api", getapi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get(`/api/articles/:article_id/comments`, getarticle_cmnt);
app.get("/api/articles/:id", getarticle_id);
app.post("/api/articles/:article_id/comments", postArticle);
app.get("/", (request, response, next) => {
  response.status(404).send({ msg: "Path not found" });
});
app.use((req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
});

module.exports = { app };
