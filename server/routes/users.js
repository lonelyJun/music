var express = require("express");
var router = express.Router();
var Dao = require("../dao/UserDao");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Dao.findAll((result) => {
    res.json(ad);
  });
});

/* Post regist */
router.post("/regist", function (req, res, next) {
  let newData = req.body;
  if (!newData.level)
    newData.level = 0;
  Dao.addData(newData, result => {
    res.json(result);
  });
});

/* Post login */
router.post("/login", function (req, res, next) {
  let userInfo = req.body;
  Dao.findOneByUsername(userInfo.user_name, result => {
    let doc = result.data;
    if (!doc || doc.length == 0) {
      res.send({
        code: 1,
        msg: "查找不到该用户"
      });
    } else if (result.code == 1) {
      res.send({
        code: 1,
        msg: result.msg
      });
    } else if (doc.password != userInfo.password) {
      res.send({
        code: 1,
        msg: "密码不正确"
      });
    } else {
      res.send({
        code: 0,
        msg: result.msg,
        data: {
          id: doc._id,
          user_name: doc.user_name
        }
      });
    }
  });
});

//设置用户等级
router.post("/setLevel", function (req, res, next) {
  let level = req.body.level;
  let id = req.body.id
  Dao.setLevelById(id, level, result => {
    res.json(result)
  })
});

module.exports = router;