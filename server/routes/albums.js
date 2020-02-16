var express = require("express");
var router = express.Router();
const Dao = require("../dao/AlbumDao");
const SingerDao = require("../dao/SingerDao");
const SongDao = require("../dao/SongDao");

router.get("/", function (req, res, next) {
  Dao.findAll(result => {
    res.json(result);
  });
});



router.get("/albumDetail", function (req, res, next) {
  let id = req.body.albumId;
  let userId = req.body.userId
  Dao.findOneById(id, result => {
    //对返回数据做处理
    if (result.code != 0) {
      res.json(result);
    } else {
      let data = result.data;
      if (data.song) {
        data.songs.forEach(song => {
          if (song.users.includes(userId) == -1) {
            song.fav = false
          } else {
            song.fav = true
          }
        })
      }
      res.json({
        code: 0,
        message: 'success',
        data: data
      })
    }
  });
});

router.post("/addAlbum", function (req, res, next) {
  let oriData = {
    album_name: "",
    public_time: "",
    price: 0,
    cover: "",
    singers: [],
    songs: []
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

router.post("/addSinger", function (req, res) {
  let albumId = req.body.albumId;
  let singerId = req.body.singerId;
  Dao.addSingersById(albumId, singerId, result => {
    if (result.code == 0) {
      if (typeof singerId == 'object') {
        singerId.forEach(id => {
          SingerDao.addAlbumsById(id, albumId, sResult => {
            res.json(sResult)
          })
        })
      } else {
        SingerDao.addAlbumsById(singerId, albumId, sResult => {
          res.json(sResult)
        })
      }
    } else {
      res.json(result)
    };
  });
});

router.post("/addSong", function (req, res) {
  let albumId = req.body.albumId;
  let songId = req.body.songId;
  Dao.addSingersById(albumId, songId, result => {
    if (result.code == 0) {
      if (typeof songId == 'object') {
        songId.forEach(id => {
          SongDao.addAlbumById(id, albumId, sResult => {
            res.json(sResult)
          })
        })
      } else {
        SongDao.addAlbumById(songId, albumId, sResult => {
          res.json(sResult)
        })
      }
    } else {
      res.json(result)
    };
  });
});

router.post("/rename", function (req, res, next) {
  let id = req.body.albumId;
  Dao.updateAlbumNameById(id, doc => {
    res.json(doc);
  })
});

router.delete("/:id", function (req, res, next) {
  let id = req.params.id;
  Dao.deleteOneById(id, result => {
    res.json(err);
  });
});



module.exports = router;