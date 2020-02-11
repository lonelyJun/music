const mongoose = require("mongoose");
require("../model");
const Dao = require("../dao/SingerDao");
const assert = require("assert");
describe("测试SingerDao", () => {
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
  it("测试添加一个歌手", done => {
    const newSiner = {
      singer_name: '周杰伦',
      singer_sex: '男',
      singer_birth: new Date(1979, 01, 18),
      link: '',
      headImg: ''
    };
    Dao.addData(newSiner, result => {
      assert(result.code == 0);
      done();
    });
  });
  it("测试所有歌手", done => {
    Dao.findAll(result => {
      assert(result.code == 0);
      done();
    });
  });
  it('按照ID删除专辑', done => {
    //请通过http中get返回的结果设置进行测试
    let id = "5e4179199945652ac0fa9d02";
    Dao.deleteOneById(id, result => {
      assert(result.code == 0)
      done()
    })
  })
});