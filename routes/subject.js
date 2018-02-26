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

router.get('/:id/enrolledstudents', function (req, res) {
  models.Subject.findById(req.params.id, {
    include: [{
      model: models.Student
    }]
  }).then(subjects => {
    let data = JSON.parse(JSON.stringify(subjects))
    // console.log(data.Students[0].subject_student.score);
    res.render('add-score', {data_subject: subjects})
  })
})

router.get('/:id_subject/enrolledstudents/:id_student/score', function (req, res) {
  models.subject_student.findOne({
    attributes: ['id'],
    where: {
      id_student: req.params.id_student
    }
  }).then(data => {

    // console.log(data);
    res.render('score', {data: data})
  })

router.post('/:id_subject/enrolledstudents/:id_student/subjects/:id_conj/give_score', function (req, res) {
  let obj = {
    score: req.body.score
  }
  console.log(obj);
  models.subject_student.update(obj,{
    where: {
      id: req.params.id_conj
    }
  }).then(data => {
    res.redirect('subjects')
    // res.redirect('/subjects/1/enrolledstudents')
  })
})


    // console.log(data.id);
})




module.exports = router
