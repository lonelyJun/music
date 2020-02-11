//建立模型模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//用户模型
const UserSchema = {
  user_name: String,
  password: String,
  level: Number,
  favours: {
    songs: [{
      type: Schema.Types.ObjectId,
      ref: 'Song'
    }]
  }
}

mongoose.model('User', UserSchema)

//建立专辑模型
const AlbumsSchema = {
  album_name: String,
  public_time: Date,
  cover: String,
  singers: [{
    type: Schema.Types.ObjectId,
    ref: 'Singer'
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }]
}

mongoose.model('Album', AlbumsSchema)

const SingerSchema = {
  singer_name: String, //歌手名字
  singer_sex: String, //歌手性别
  singer_birth: Date, //歌手生日
  link: String, //相关链接
  headImg: String, //头像
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album'
  }]
}

mongoose.model('Singer', SingerSchema)

const SongSchema = {
  song_name: String, //歌名
  link: String, //链接
  singers: [{ //歌手
    type: Schema.Types.ObjectId,
    ref: 'Singer'
  }],
  album: { //所属专辑
    type: Schema.Types.ObjectId,
    ref: 'Album'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}

mongoose.model('Song', SongSchema)