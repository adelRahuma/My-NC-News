const { response } = require("express");
const express = require("express");
const {
  getTopics,
  getapi,
  getArticles,
  error,
} = require("./Conrollers/getConroller");

const app = express();
app.use(express.json());
app.get("/api", getapi);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

app.get("/", (request, response) => {
  response.status(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).sent({ msg: "Check the above error!." });
});

module.exports = { app };
