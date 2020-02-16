const mongoose = require('mongoose')
const {
  daoDataPackage
} = require('../utils/daoDataPackage')

let ModelObj = mongoose.model('Album')



//添加完整数据
const addData = (newData, callback) => {
  ModelObj.create(newData, function (err, nd) {
    callback(daoDataPackage(err, nd));
  })
}

//由专辑名称修改专辑名
const updateAlbumNameById = (id, newName, callback) => {
  ModelObj.update({
    _id: id
  }, {
    album_name: newName
  }, (err, updateResult) => {
    callback(daoDataPackage(err, updateResult));
  })
}


//由专辑ID添加歌手
const addSingersById = (id, singers, callback) => {
  if ((typeof (singers) != 'string')) {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        singers: {
          $each: singers
        }
      }
    }, function (
      err,
      updateResult
    ) {
      callback(daoDataPackage(err, updateResult));

    })
  } else {
    ModelObj.update({
      _id: id
    }, {
      $addToSet: {
        singers: singers
      }
    }, function (
      err,
      updateResult
    ) {
      callback(daoDataPackage(err, updateResult));
    })
  }

}

//由专辑ID添加歌曲
const addSongsById = (id, songs, callback) => {
  if ((typeof (songs) != 'string')) {
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
      updateResult
    ) {
      callback(daoDataPackage(err, updateResult));
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
      updateResult
    ) {
      callback(daoDataPackage(err, updateResult));
    })
  }
}

const findAll = callback => {
  ModelObj.find({})
    .lean()
    .populate('singers')
    .populate('songs')
    .exec((err, findAllResult) => {
      callback(daoDataPackage(err, findAllResult));
    })
}

const findOneById = (id, callback) => {
  ModelObj.find({
      _id: id
    })
    .lean()
    .populate('singers')
    .populate('songs')
    .exec((err, findAllResult) => {
      callback(daoDataPackage(err, findAllResult));
    })
}

// const findAllPopulte = callback => {
//   ModelObj.find({}).lean().populate('singers').populate('songs').exec((err, findAllResult) => {
//     callback(daoDataPackage(err, findAllResult));
//   })
// }

const deleteOneById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    callback(daoDataPackage(err, {}));
  })
}

const deleteAll = callback => {
  ModelObj.deleteMany({}, err => {
    callback(daoDataPackage(err, {}));
  })
}

module.exports = {
  findAll,
  findOneById,
  deleteOneById,
  addData,
  addSingersById,
  addSongsById,
  deleteAll,
  updateAlbumNameById
}