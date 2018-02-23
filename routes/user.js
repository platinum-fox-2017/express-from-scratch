const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.User.findAll().then(dataUser => {
    res.render('user', {title: 'User List', dataUser: dataUser})
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
