const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req,res) {
  models.Student.findAll().then(students => {
    res.render('student', {data_student: students})
  })
})

router.get('/add', function (req, res) {
  res.render('add-student')
})

router.post('/add', function (req, res) {
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  models.Student.create(obj).then(students => {
    res.redirect('/students')
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
      res.redirect('/teachers')
    })
})

router.get('/delete:id')

module.exports = router
