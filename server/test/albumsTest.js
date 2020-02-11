const mongoose = require("mongoose");
require("../model");
const Dao = require("../dao/AlbumDao");
const assert = require("assert");
let bookList = [];
describe("测试AlbumDom", () => {
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
  it("测试添加一专辑", done => {
    const newAlumb = {
      album_name: "叶惠美",
      public_time: new Date(2004, 8, 3),
      cover: ""
    };
    Dao.addData(newAlumb, result => {
      assert(result.code == 0);
      done();
    });
  });
  it("测试查询所有的专辑", done => {
    Dao.findAll(result => {
      assert(result.code == 0);
      done();
    });
  });
  it("测试专辑添加歌手", done => {
    let id = "5e41d3a1d5bd2826285b521a" //根据find结果设置
    // let singerId = "5e41817cff44d029a02082b9" //根据find结果设置
    let singerId = ["5e41817cff44d029a02082b9", "5e4181a580c0ab17b823a7e5"] //根据find结果设置

    Dao.addSingersById(id, singerId, result => {
      console.log(result);
      assert(result.code == 0);
      done();
    });
  });
  it("测试专辑添加歌曲", done => {
    let id = "5e41d3a1d5bd2826285b521a" //根据find结果设置
    let songId = "5e41a17c641bfa16d893a455" //根据find结果设置
    // let songId = ["",""] //根据find结果设置
    Dao.addSongsById(id, songId, result => {
      console.log(result);
      assert(result.code == 0);
      done();
    });
  });
  // it('按照ID删除专辑', done => {
  //   let id = "" // 根据find结果设置
  //   Dao.deleteAlbumById(id, err => {
  //     assert(err == null)
  //     done()
  //   })
  // })
});