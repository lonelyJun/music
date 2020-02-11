var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var albumsRouter = require("./routes/albums");
var singersRouter = require("./routes/singers");
var songsRouter = require("./routes/songs");

var app = express();

//跨域中间件
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin/users", usersRouter);
app.use("/albums", albumsRouter);
app.use("/singers", singersRouter);
app.use("/songs", songsRouter);

module.exports = app;