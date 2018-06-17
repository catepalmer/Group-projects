const express = require('express')
const db = require('../db')
const router = express.Router()
let score = 0
let scenesDone = 0

router.get('/index', (req, res) => {
  res.render('index')
})

router.get('/', (req, res) => {
  res.redirect('index')
})

router.get('/scenes/:id', (req, res) => {
  let id = req.params.id
    db.getScene(id)
      .then((data) => {
        res.render('scenes', data)
      })
})

router.post('/consequences', (req, res) => {
  db.getChoice(req.body)
  .then((data) => {
    score += data.points
    scenesDone++
    // console.log('This is the score: ' + score)
    res.render('consequences', data)
  })
})

router.post('/scenes/:id', (req, res) => {
  let id = req.params.id
  // db.getScenesNew()
  //   .then((data) => {
      if (id !== 0) {
      let id = req.params.id
      db.getScene(id)
      .then((data) => {
        res.render('scenes', data)
      })
    } else if (score >= 15) {
    res.render('pass', score)
  } else {
    res.render('fail', score)
  }
})





module.exports = router
