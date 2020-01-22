var express = require("express");
var router = express.Router();
var dao = require("../dao/UserDao");

/* GET users listing. */
router.get("/", function(req, res, next) {
  dao.findAllUsers((err, ad) => {
    res.send(ad);
  });
});

/* Post regist */
router.post("/regist", function(req, res, next) {
  let newData = req.body;
  dao.addNewUser(newData, (err, nd) => {
    res.send(nd);
  });
});

/* Post login */
router.post("/login", function(req, res, next) {
  let userInfo = req.body;
  dao.findOneByUsername(userInfo.user_name, (err, result) => {
    if (!result || result.length == 0) {
      res.send({ code: 1, msg: "查找不到该用户" });
    } else if (err) {
      res.send({ code: 1, msg: err });
    } else if (result.password != userInfo.password) {
      res.send({ code: 1, msg: "密码不正确" });
    } else {
      res.send({
        code: 0,
        msg: "成功",
        data: { id: result._id, user_name: result.user_name }
      });
    }
  });
});

module.exports = router;
