const mongoose = require("mongoose");
require("../model");
const dao = require("../dao/UserDao");
const assert = require("assert");
describe("测试User数据", () => {
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
  it("测试添加一用户", done => {
    dao.addData({
        user_name: "张峻郡",
        password: "12345678",
        level: 0
      },
      (err, nd) => {
        if (!err) {
          assert(nd._id != null);
        }
        done();
      }
    );
  });
  it("测试查询所有用户", done => {
    dao.findAll((err, ad) => {
      if (!err) {
        assert(ad.length > 0);
      }
      done();
    });
  });

  it("测试指定用户", done => {
    dao.findOneByUsername("张峻郡", (err, re) => {
      if (!err) {
        assert(re.length > 0);
      }
      done();
    });
  });

  // it('按照ID删除专辑', done => {
  //   let id = bookList[0]._id
  //   AlbumDao.deleteAlbumById(id, err => {
  //     assert(err == null)
  //     done()
  //   })
  // })
});