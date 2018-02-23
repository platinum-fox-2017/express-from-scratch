const express = require('express');
const router = express.Router()

router.get('/', function (req, res) {
  res.send('I love u')
})

module.exports = router
