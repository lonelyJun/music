const mongoose = require("mongoose");

let ModelObj = mongoose.model("Album");

const addAlbum = (album, callback) => {
  ModelObj.create(album, function(err, nd) {
    if (!err) callback(null, nd);
    else callback(err);
  });
};

const findAllAlbums = callback => {
  ModelObj.find({})
    .lean()
    .exec((err, findAllResult) => {
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

module.exports = { addAlbum, findAllAlbums, deleteAlbumById };
