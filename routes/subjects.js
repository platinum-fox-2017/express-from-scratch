'use strict';
const model = require('../models');
module.exports = (function() {
  // app.set('view engine', 'ejs')
const subjects = require('express').Router();
subjects.get('/', function (req, res) {
  model.Subject.findAll({
    include: [{
      model: model.Teacher
    }]
  }).then(subjects => {
    let data = JSON.parse(JSON.stringify(subjects))

    console.log(data[0].Teachers);

    res.render('subject', {data_subject: subjects})
  })
})

    return subjects;
})();
