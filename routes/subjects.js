const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Subject.findAll({
    include: {model: models.Teacher}
  }).then(subjects => {
    res.render('subjects', {title: 'Subjects', subjects})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  models.StudentsSubjects.findAll({
    include: [models.Student, models.Subject],
    attributes: ['id', 'studentId', 'subjectId', 'score'],
    where: {subjectId: req.params.id}
  }).then(data => {
    // res.send(data);
    res.render('enrolled_students', {title: 'Enrolled Students', data})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/:subjectId/:studentId/givescore', (req, res) => {
  models.StudentsSubjects.findOne({
    include: [models.Student, models.Subject],
    attributes: ['id', 'studentId', 'subjectId'],
    where: {subjectId: req.params.subjectId, studentId: req.params.studentId}
  }).then(data => {
    // res.send(data)
    res.render('givescore', {title: 'Give Score', data})
  }).catch(err => {
    res.send(err)
  })
})

router.post('/:subjectId/:studentId/givescore', (req, res) => {
  models.StudentsSubjects.update({
    score: req.body.score
  },{
    where: {subjectId: req.params.subjectId, studentId: req.params.studentId}
  }).then(data => {
    res.redirect('/subjects/'+req.params.subjectId+'/enrolledstudents')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
