const mongoose = require('mongoose')
const {
  daoDataPackage
} = require('../utils/daoDataPackage')
let ModelObj = mongoose.model('Song')

const addData = (newData, callback) => {
  ModelObj.create(newData, function (err, nd) {
    callback(daoDataPackage(err, nd.toObject()))
  })
}

const findAll = callback => {
  ModelObj.find({})
    .lean()
    .exec((err, findAllResult) => {
      callback(daoDataPackage(err, findAllResult))

    })
}

const findAllPopulate = callback => {
  ModelObj.find({}).lean().populate('singers').populate('album').exec((err, findAllResult) => {
    callback(daoDataPackage(err, findAllResult))
  })
}

//查询特定歌曲
const findOneById = (id, callback) => {
  ModelObj.find({
    _id: id
  }).lean().populate('singers').populate('album').polulate('users').exec((err, findAllResult) => {
    callback(daoDataPackage(err, findAllResult))
  })
}

const deleteOneById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    callback(daoDataPackage(err, {}))
  })
}

//由专辑ID添加歌手
const addSingersById = (id, singerId, callback) => {
  if (typeof singerId != 'string') {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        singers: {
          $each: singerId
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
        singers: singerId
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
const addAlbumById = (id, albumId, callback) => {
  ModelObj.update({
    _id: id
  }, {
    album: {
      _id: albumId
    }
  }, function (
    err,
    updateRestult
  ) {
    callback(daoDataPackage(err, updateRestult))
  })
}

//由专辑ID添加收藏的用户id
const addUserById = (id, userId, callback) => {
  ModelObj.update({
    _id: id
  }, {
    $addToSet: {
      users: userId
    }
  }, function (
    err,
    updateRestult
  ) {
    callback(daoDataPackage(err, updateRestult))
  })
}

const deleteAll = (callback) => {
  ModelObj.deleteMany({}, (err) => {
    callback(daoDataPackage(err, {}))
  })
}

module.exports = {
  addData,
  findAll,
  deleteOneById,
  addSingersById,
  findOneById,
  // addSingersByName,
  addAlbumById,
  findAllPopulate,
  deleteAll,
  addUserById
}