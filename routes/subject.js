const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req, res) {
  models.Subject.findAll({
    include: [{
      model: models.Teacher
    }]
  }).then(subjects => {
    let data = JSON.parse(JSON.stringify(subjects))

    console.log(data[0].Teachers);

    res.render('subject', {data_subject: subjects})
  })
})


module.exports = router
