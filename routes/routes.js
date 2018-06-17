const express = require('express')
const db = require('../db')
const router = express.Router()
let score = 0

router.get('/index', (req, res) => {
  resetScore()
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
    res.render('consequences', data)
  })
})

router.post('/scenes/:id', (req, res) => {
  let id = req.params.id
    if (id > 0) {
      db.getScene(id)
      .then((data) => {
        res.render('scenes', data)
      })
    } else if (id == 0 && score >= 15) {
    res.render('pass', {score: score})
  } else {
    res.render('fail', {score: score})
  }
})

function resetScore () {
  score = 0
}


module.exports = router
