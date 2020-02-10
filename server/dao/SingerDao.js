const mongoose = require('mongoose')

let ModelObj = mongoose.model('Singer')

const addData = (singers, callback) => {
  ModelObj.create(singers, function(err, newData) {
    if (!err) callback(null, newData)
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

module.exports = { addData, findAll, deleteOneById }
