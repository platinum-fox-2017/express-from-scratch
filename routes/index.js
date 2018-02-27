const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('I love Hacktiv8')
})

module.exports = router;
