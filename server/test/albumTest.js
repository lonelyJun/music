const mongoose = require('mongoose')
require('../model')
const AlbumDao = require('../dao/AlbumDao')
const assert = require('assert')
let bookList = []
describe('测试BookDom', () => {
  before(() => {
    mongoose.connect(
      'mongodb://39.98.70.116:27017/alumTest2',
      { useMongoClient: true },
      err => {
        if (!err) {
        }
      }
    )
  })
  after(() => {
    mongoose.disconnect()
  })
  // it('测试添加一专辑', done => {
  //   AlbumDao.addSinger(id, newAlumb, (err, al) => {
  //     assert(al._id != null)
  //     done()
  //   })
  // })
  it('测试查询所有的专辑', done => {
    AlbumDao.findAllAlbums((err, albums) => {
      assert(albums.length > 0)
      done()
    })
  })
  // it('按照ID删除专辑', done => {
  //   let id = bookList[0]._id
  //   AlbumDao.deleteAlbumById(id, err => {
  //     assert(err == null)
  //     done()
  //   })
  // })
})
