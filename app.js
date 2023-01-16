const express = require("express");
const { getTopics, getapi } = require("./Conrollers/getConroller");

const app = express();
app.use(express.json());
app.get("/api", getapi);
app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).sent({ msg: "Check the above error!." });
});

module.exports = { app };
