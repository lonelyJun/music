const mongoose = require("mongoose");

let ModelObj = mongoose.model("Album");

// const addAlbum = (id, singer, callback) => {
//   ModelObj.findByIdAndUpdate(id, { $push: singer }, function(err, na) {
//     if (!err) callback(null, na.toObject());
//     else callback(err);
//   });
// };

const findAllAlbums = callback => {
  ModelObj.find({}).exec((err, findAllResult) => {
    if (!err) callback(null, findAllResult);
    else callback(err);
  });
};

const deleteAlbumById = (id, callback) => {
  ModelObj.findByIdAndRemove(id, err => {
    if (!err) callback(null, {});
    else callback(err);
  });
};

module.exports = { findAllAlbums, deleteAlbumById };
