const mongoose = require("mongoose");
require("../model");
const Dao = require("../dao/SongDao");
const assert = require("assert");
describe("测试SongDao", () => {
  before(() => {
    mongoose.connect(
      "mongodb://localhost:27017/test", {
        useMongoClient: true
      },
      err => {
        if (!err) {}
      }
    );
  });
  after(() => {
    mongoose.disconnect();
  });
  it("测试添加一首歌", done => {
    const newSong = {
      song_name: '东风破', //歌名
      link: '', //链接
      singers: [],
      album: null
    };
    Dao.addData(newSong, result => {
      assert(result.code == 0);
      done();
    });
  });
  it("测试获取所有歌曲", done => {
    Dao.findAll(result => {
      assert(result.code == 0);
      done();
    });
  });
  it('获取所有歌曲包括关联数据', done => {
    //请通过http中get返回的结果设置进行测试
    Dao.findAllPopulate(result => {
      assert(result.code == 0)
      done()
    })
  })
  it('按照ID添加歌手', done => {
    //请通过http中get返回的结果设置进行测试
    let songId = "5e41a17c641bfa16d893a455";
    // let singerId = "5e41817cff44d029a02082b9"
    let singerId = ["5e41817cff44d029a02082b9", "5e4181a580c0ab17b823a7e5"] //根据find结果设置

    Dao.addSingersById(songId, singerId, result => {
      assert(result.code == 0)
      done()
    })
  })
  it('按照ID返回歌曲详情', done => {
    //请通过http中get返回的结果设置进行测试
    let songId = "5e41a17c641bfa16d893a455";

    Dao.findOneById(songId, result => {
      assert(result.code == 0)
      done()
    })
  })
  // it('按照ID删除专辑', done => {
  //   //请通过http中get返回的结果设置进行测试
  //   let id = "5e419d0f6627b3556807445b";
  //   Dao.deleteOneById(id, result => {
  //     assert(result.code == 0)
  //     done()
  //   })
  // })
  // it('清空歌曲数据', done => {
  //   //请通过http中get返回的结果设置进行测试
  //   Dao.deleteAll(result => {
  //     assert(result.code == 0)
  //     done()
  //   })
  // })
});