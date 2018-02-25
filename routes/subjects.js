const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Subject.findAll().then(data => {
    res.render('subjects', {title: 'Subjects', data: data})
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
