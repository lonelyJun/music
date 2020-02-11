const mongoose = require("mongoose");
const {
  daoDataPackage
} = require('../utils/daoDataPackage')
// 赋值模型对象
let ModelObj = mongoose.model("User");

//添加新数据
const addData = (newData, callback) => {
  ModelObj.create(newData, (err, nd) => {
    callback(daoDataPackage(err, nd))
  });
};

//根据数据名字查找数据
const findOneByUsername = (attr, callback) => {
  ModelObj.findOne({
      user_name: attr
    })
    .lean()
    .exec((err, result) => {
      callback(daoDataPackage(err, result))
    });
};

//查找所有数据
const findAll = callback => {
  ModelObj.find({}).exec((err, result) => {
    callback(daoDataPackage(err, result))
  });
};

//删除某个数据
const deleteUserById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    callback(daoDataPackage(err, {}))
  });
};

const addSongToFavById = (id, songId, callback) => {
  ModelObj.updateOne({
    _id: id
  }, {
    favours: {
      $addToSet: {
        songs: songId
      }
    }
  })
}

module.exports = {
  addData,
  findAll,
  deleteUserById,
  findOneByUsername,
  addSongToFavById
};