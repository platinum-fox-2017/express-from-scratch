'use strict'
const express = require('express');
const app = express();
const router = express.Router()


// routes will go here
router.get('/', function (req, res) {
  // res.send('Welcome to Sekolah dasar Mentari!')
  res.render('index')
})

module.exports = router