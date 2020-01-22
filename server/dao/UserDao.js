const mongoose = require("mongoose");

// 赋值模型对象
let ModelObj = mongoose.model("User");

//添加新数据
const addNewUser = (newData, callback) => {
  ModelObj.create(newData, (err, nd) => {
    if (!err) callback(null, nd);
    else callback(err);
  });
};

//根据数据名字查找数据
const findOneByUsername = (attr, callback) => {
  ModelObj.findOne({ user_name: attr })
    .lean()
    .exec((err, result) => {
      if (!err) {
        let newResult = result;
        callback(null, newResult);
      } else callback(err);
    });
};

//查找所有数据
const findAllUsers = callback => {
  ModelObj.find({}).exec((err, result) => {
    if (!err) callback(null, result);
    else callback(err);
  });
};

//删除某个数据
const deleteUserById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    if (!err) callback(null, {});
    else callback(err);
  });
};

module.exports = {
  addNewUser,
  findAllUsers,
  deleteUserById,
  findOneByUsername
};
