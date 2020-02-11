var express = require("express");
var router = express.Router();
const Dao = require("../dao/SingerDao");

router.get("/", function (req, res, next) {
  Dao.findAll(result => {
    res.json(result);
  });
});

router.post("/addSinger", function (req, res, next) {
  let oriData = {
    singer_name: '',
    singer_sex: '',
    singer_birth: new Date(1900, 01, 01),
    link: '',
    headImg: ''
  };
  let data = req.body;
  //初始化对象
  let newData = null;
  if (!data.length) {
    newData = Object.assign(oriData, data);
  } else {
    newData = data.map(d => Object.assign(oriData, d));
  }
  Dao.addData(newData, result => {
    res.json(result);
  });
});

router.delete("/:id", function (req, res, next) {
  let id = req.params.id;
  Dao.deleteOneById(id, result => {
    res.json(result);
  });
});

module.exports = router;