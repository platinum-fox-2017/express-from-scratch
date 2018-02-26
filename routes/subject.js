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
    res.render('subject', {data_subject: subjects})
  })
})

router.get('/:id/enrolledstudents', function (req, res) {
  models.Subject.findById(req.params.id, {
    include: [{
      model: models.Student
    }]
  }).then(subjects => {
    res.render('add-score', {data_subject: subjects})
  })
})

router.get('/:id/givescore', function (req, res) {
  models.subject_student.findOne({
    attributes: ['id'],
    where: {
      id_student: req.params.id
    },
    include: [models.Student, models.Subject]
  }).then(data => {
    let asd = JSON.parse(JSON.stringify(data))
    res.render('score', {data: data})
  })
})

router.post('/:id_subject/:id_student/givescore', function (req, res) {
  let obj = {
    score: req.body.score
  }
  models.subject_student.update(obj,{
    where: {
      id_subject: req.params.id_subject,
      id_student: req.params.id_student
    }
  }).then(data => {
    res.redirect(`/subjects/${req.params.id_subject}/enrolledstudents`)
  })
})





module.exports = router
