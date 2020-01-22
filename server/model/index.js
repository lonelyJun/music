//建立模型模块
const mongoose = require("mongoose");

//用户模型
const UserSchema = {
  user_name: String,
  password: String,
  level: Number
};

mongoose.model("User", UserSchema);

//专辑模型
const AlbumsSchema = {
  _id: Schema.Types.ObjectId,
  album_name: String,
  public_time: Date,
  price: Number,
  cover: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
};

mongoose.model("Album", AlbumsSchema);

//歌手模型
const SingerSchema = {
  _id: Schema.Types.ObjectId,
  singer_name: String,
  singer_sex: String,
  singer_birth: Date,
  link: String,
  headImg: String
};

mongoose.model("Singer", SingerSchema);

//歌曲模型
const SongSchema = {
  _id: Schema.Types.ObjectId,
  song_name: String,
  link: String,
  duration: Number,
  headImg: String,
  singers: [{ type: Schema.Types.ObjectId, ref: "Singer" }]
};

mongoose.model("Song", SongSchema);
