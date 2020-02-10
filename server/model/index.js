//建立模型模块
const mongoose = require('mongoose')

//用户模型
const UserSchema = {
  user_name: String,
  password: String,
  level: Number,
  favours: {
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }]
  }
}

mongoose.model('User', UserSchema)

//建立专辑模型
const AlbumsSchema = {
  album_name: String,
  public_time: Date,
  cover: String,
  singers: [{ type: Schema.Types.ObjectId, ref: 'Singer' }],
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
}

mongoose.model('Album', AlbumsSchema)

const SingerSchema = {
  singer_name: String,
  singer_sex: String,
  singer_birth: Date,
  link: String,
  headImg: String
}

mongoose.model('Singer', SingerSchema)

const SongSchema = {
  song_name: String,
  link: String,
  singers: [{ type: Schema.Types.ObjectId, ref: 'Singer' }],
  album: { type: Shema.Types.ObjectId, ref: 'Album' }
}

mongoose.model('Song', SongSchema)
