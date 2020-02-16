var express = require("express");
var router = express.Router();
const Dao = require("../dao/SongDao");
const SingerDao = require("../dao/SingerDao");
const AlbumDao = require("../dao/AlbumDao");
const UserDao = require("../dao/UserDao");

router.get("/", function (req, res, next) {
  Dao.findAllPopulate(result => {
    res.json(result);
  });
});

router.post("/addSong", function (req, res, next) {
  let oriData = {
    song_name: '', //歌名
    link: '', //链接
    singers: [],
    album: null
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

router.get("/songDetail", function (req, res, next) {
  let id = req.body.songId;
  let userId = req.body.userId;
  Dao.findOneById(id, result => {
    if (result.data.users.includes(userId) == -1) {
      result.data.fav = false;
    } else {
      result.data.fav = true;
    }
    res.json(result);
  });
});

router.post("/addSinger", function (req, res) {
  let songId = req.body.songId;
  let singerId = req.body.singerId;
  Dao.addSingersById(songId, singerId, result => {
    if (result.code == 0) {
      if (typeof singerId == 'object') {
        singerId.forEach(id => {
          SingerDao.addSongsById(id, songId, sResult => {
            res.json(sResult)
          })
        })
      } else {
        SingerDao.addSongsById(singerId, songId, sResult => {
          res.json(sResult)
        })
      }

    } else {
      res.json(result)
    };
  });
});

router.post("/addAlbum", function (req, res) {
  let songId = req.body.songId;
  let albumId = req.body.albumId;
  Dao.addAlbumById(songId, albumId, result => {
    if (result.code == 0) {
      AlbumDao.addSongsById(albumId, songId, sResult => {
        res.json(sResult)
      })
    }
  });
});

router.post("/addUser", function (req, res) {
  let songId = req.body.songId;
  let userId = req.body.albumId;
  Dao.addUserById(songId, userId, result => {
    if (result.code == 0) {
      UserDao.addSongToFavById(userId, songId, sResult => {
        res.json(sResult)
      })
    }
  });
});

router.delete("/:id", function (req, res, next) {
  let id = req.params.id;
  Dao.deleteOneById(id, result => {
    res.json(result);
  });
});

module.exports = router;