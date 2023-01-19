const { response } = require("express");
const express = require("express");
const {
  getTopics,
  getapi,
  getArticles,
  getarticle_cmnt,
  getarticle_id,
  getUsers,
} = require("./Conrollers/getConroller");
const { postArticle, patcharticle_id } = require("./Conrollers/postConroller");
const app = express();
app.use(express.json());
app.get("/api", getapi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get(`/api/articles/:article_id/comments`, getarticle_cmnt);
app.get("/api/articles/:id", getarticle_id);
app.post("/api/articles/:article_id/comments", postArticle);
app.patch(`/api/articles/:article_id`, patcharticle_id);
app.get("/api/users", getUsers);

app.get("/", (request, response, next) => {
  response.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Article not found" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Article not found" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
});
app.use((req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = { app };
