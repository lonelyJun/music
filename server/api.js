api = {
  "返回的数据统一格式": {
    code: 0, //0成功 1失败
    message: "success", //报错时错误信息
    data: {} //数据
  },

  "添加歌手": {
    url: '/singers/addSinger',
    method: 'POST',
    data: { //传入数据
      singer_name: String, //歌手名字
      singer_sex: String, //歌手性别
      singer_birth: Date, //歌手生日
      link: String, //相关链接
      headImg: String //头像
    }
  },
  "返回所有歌手信息": {
    url: '/singer',
    method: 'GET',
  },

  "添加歌曲": {
    url: '/songs/addSong',
    method: 'POST',
    data: { //传入数据
      song_name: String, //歌名
      link: String, //链接
    }
  },
  "返回所有歌曲信息": {
    url: '/songs',
    method: 'GET',
  },
  "返回某首歌信息": {
    url: '/songs/songDetail?songId=' + songId,
    method: 'GET'
  },
  "给某首歌添加歌手": {
    url: '/songs/addSinger',
    method: 'POST',
    data: {
      songId: String,
      singerId: String | Array
    }
  },
  "收藏歌曲": {
    url: '/songs/addSinger',
    method: 'POST',
    data: {
      songId: String,
      userId: String
    }
  },

  "添加专辑": {
    url: '/albums/addAlbum',
    method: 'POST',
    data: { //传入数据
      album_name: String,
      public_time: Date,
      cover: String,
    }
  },
  "返回所有专辑信息": {
    url: '/albums',
    method: 'GET',
  },
  "返回某专辑信息": { //收藏在此进行，此处返回的song数组中应有一个fav属性，true代表收藏，false代表为收藏
    url: '/albums/albumDetail?albumId=' + albumId + "&userId=" + userId,
    method: 'GET'

  },
  "给专辑添加歌手": {
    url: '/albums/addSinger',
    method: 'POST',
    data: {
      albumId: String,
      singerId: String | Array
    }
  },
  "给专辑添加歌曲": {
    url: '/albums/addSinger',
    method: 'POST',
    data: {
      albumId: String,
      singerId: String | Array
    }
  },
  "设置用户等级": {
    url: '/users/setLevel',
    method: 'POST',
    data: {
      id: String,
      level: Number
    }
  }
}