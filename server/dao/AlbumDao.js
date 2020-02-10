const mongoose = require('mongoose')

let ModelObj = mongoose.model('Album')

//添加完整数据
const addData = (albums, callback) => {
  ModelObj.create(albums, function(err, newData) {
    if (!err) callback(null, newData)
    else callback(err)
  })
}

//由专辑ID添加歌手
const addSingersById = (id, singers, callback) => {
  ModelObj.update({ _id: id }, { $push: { singers } }, function(
    err,
    updateRestult
  ) {
    if (!err) callback(null, updateRestult)
    else callback(err)
  })
}

//由专辑名添加歌手
const addSingersByName = (name, singers, callback) => {
  ModelObj.update({ album_name: name }, { $push: { singers } }, function(
    err,
    updateRestult
  ) {
    if (!err) callback(null, updateRestult)
    else callback(err)
  })
}

//由专辑ID添加歌曲
const addSongsById = (id, songs, callback) => {
  ModelObj.update({ _id: id }, { $push: { songs } }, function(
    err,
    updateRestult
  ) {
    if (!err) callback(null, updateRestult)
    else callback(err)
  })
}

//由专辑名添加歌曲
const addSongsByName = (name, songs, callback) => {
  ModelObj.update({ album_name: name }, { $push: { songs } }, function(
    err,
    updateRestult
  ) {
    if (!err) callback(null, updateRestult)
    else callback(err)
  })
}

const findAll = callback => {
  ModelObj.find({})
    .lean()
    .exec((err, findAllResult) => {
      if (!err) callback(null, findAllResult)
      else callback(err)
    })
}

const deleteOneById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    if (!err) callback(null, {})
    else callback(err)
  })
}

module.exports = {
  findAll,
  deleteOneById,
  addData,
  addSingersById,
  addSingersByName,
  addSongsById,
  addSongsByName
}
