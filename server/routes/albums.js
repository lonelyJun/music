var express = require("express");
var router = express.Router();
const albumDao = require("../dao/AlbumDao");

router.get("/", function(req, res, next) {
  albumDao.findAllAlbums((err, allbooks) => {
    res.json(allbooks);
  });
});

router.post("/", function(req, res, next) {
  let oriData = {
    album_name: "",
    public_time: "",
    price: 0,
    cover: "",
    singer: []
  };
  let data = req.body;
  //初始化对象
  let newData = null;
  if (!data.length) {
    newData = Object.assign(oriData, data);
  } else {
    newData = data.map(d => Object.assign(oriData, d));
  }
  albumDao.addAlumb(newData, (err, nb) => {
    res.json(nb);
  });
});

router.delete("/:id", function(req, res, next) {
  let id = req.params.id;
  albumDao.deleteAlbumById(id, err => {
    console.log(id);
    if (!err) res.json({});
    else {
      res.json(err);
    }
  });
});

module.exports = router;
