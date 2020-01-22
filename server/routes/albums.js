var express = require('express')
var router = express.Router()
const albumDao = require('../dao/AlbumDao')

router.get('/', function(req, res, next) {
  albumDao.findAllAlbums((err, allbooks) => {
    res.json(allbooks)
  })
})

router.post('/', function(req, res, next) {
  albumDao.addAlumb(req.body, (err, nb) => {
    res.json(nb)
  })
})

router.delete('/:id', function(req, res, next) {
  let id = req.params.id
  albumDao.deleteAlbumById(id, err => {
    console.log(id)
    if (!err) res.json({})
    else {
      res.json(err)
    }
  })
})

module.exports = router
