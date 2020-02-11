const mongoose = require('mongoose')
const {
  daoDataPackage
} = require('../utils/daoDataPackage')
let ModelObj = mongoose.model('Singer')

const addData = (newData, callback) => {
  ModelObj.create(newData, function (err, nd) {
    callback(daoDataPackage(err, nd))
  })
}

const findAll = callback => {
  ModelObj.find({})
    .lean()
    .exec((err, findAllResult) => {
      callback(daoDataPackage(err, findAllResult))
    })
}

const deleteOneById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    callback(daoDataPackage(err, {}))
  })
}

const deleteAll = (callback) => {
  ModelObj.deleteMany({}, (err) => {
    callback(daoDataPackage(err, {}))
  })
}

//由专辑ID添加歌手
const addSongsById = (id, songs, callback) => {
  if (typeof songs != 'string') {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        songs: {
          $each: songs
        }
      }
    }, function (
      err,
      updateRestult
    ) {
      callback(daoDataPackage(err, updateRestult))
    })
  } else {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        songs: songs
      }
    }, function (
      err,
      updateRestult
    ) {
      callback(daoDataPackage(err, updateRestult))
    })
  }
}

//由专辑ID设定所属专辑
const addAlbumsById = (id, albumId, callback) => {
  if (typeof albumId != 'string') {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        albums: {
          $each: albumId
        }
      }
    }, function (
      err,
      updateRestult
    ) {
      callback(daoDataPackage(err, updateRestult))
    })
  } else {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        albums: albumId
      }
    }, function (
      err,
      updateRestult
    ) {
      callback(daoDataPackage(err, updateRestult))
    })
  }
}

module.exports = {
  addData,
  findAll,
  deleteOneById,
  deleteAll,
  addAlbumsById,
  addSongsById
}