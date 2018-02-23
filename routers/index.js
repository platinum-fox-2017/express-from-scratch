const express = require('express');
const router = express.Router()

router.get('/', (req,res) => {
  res.render('index')
})

router.get('/form', (req,res) => {
  console.log('hahahah');
  res.render('form')
})

module.exports = router
