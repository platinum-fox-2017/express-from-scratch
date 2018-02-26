const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req,res) {
  models.Student.findAll({
    include: [{
      model: models.Subject
    }]
  }).then(students => {
    let data = JSON.parse(JSON.stringify(students))
    res.render('student', {data_student: students})
  })
})

router.get('/add', function (req, res) {
  let err = ''
  res.render('add-student', {err})
})

router.post('/add', function (req, res) {
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  models.Student.create(obj).then(students => {
    res.redirect('/students')
  }).catch(err => {
    res.render('add-student', { err })
  })
})

router.get('/edit/:id', function (req,res) {
  models.Student.findById(req.params.id).then(students => {
    res.render('edit-student', {data_student: students})
  })
})

router.post('/edit/:id', function (req, res) {
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  models.Student.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(students => {
    res.redirect('/students')
  })
})

router.get('/delete/:id', function (req, res) {
    models.Student.destroy({
      where: {
        id: req.params.id
      }
    }).then(student => {
      res.redirect('/students')
    })
})

router.get('/:id/addsubject', function (req, res) {
  models.Student.findById(req.params.id).then(students => {
    models.Subject.findAll().then(subjects => {
      res.render('add-subject', {data_student: students, data_subject: subjects})
    })
  })
})

router.post('/:id/addsubject', function (req, res) {
  let obj = {
    id_subject: req.body.id_subject,
    id_student: req.params.id
  }
  models.subject_student.create(obj).then(data => {
    res.send(`success to create data`)
  })
})



module.exports = router
