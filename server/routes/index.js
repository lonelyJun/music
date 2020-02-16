var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.redirect('/index.html')
  res.send('欢迎访问')
});

module.exports = router;