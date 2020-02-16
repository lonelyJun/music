//启动入口文件(考虑配置)

const mongoose = require("mongoose");
require("../model");
var app = require("../app");
const http = require("http");

const server = http.createServer(app);

var env = process.env.NODE_ENV || "development";
let DB_URL = "";
if ("development" === env) {
  DB_URL = "39.98.41.120";
  DB_NAME = "test";
} else {
  DB_URL = "39.98.41.120";
  DB_NAME = "musicDB";
}

mongoose.connect(
  "mongodb://" + DB_URL + ":27017/" + DB_NAME, {
    useMongoClient: true
  },
  err => {
    if (!err) {
      server.listen(3000, err => {
        console.log("express 服务已打开");
      });
    } else {
      console.log(err);
    }
  }
);

server.on("close", () => {
  mongoose.disconnect();
});