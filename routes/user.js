const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req, res) {
  models.User.findAll().then(users => {
    // console.log(users);
    res.render('user', {user: users})
  })

})

module.exports = router
