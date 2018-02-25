const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req, res) {
  models.Teacher.findAll({
    order: [
      'id'],
    include: [{
      model: models.Subject
    }]
  }).then(teachers => {
    let data = JSON.parse(JSON.stringify(teachers))
    // console.log(data);
    res.render('teacher', {data_teacher: teachers})
  })
})

router.get('/add', function (req, res) {
  models.Subject.findAll().then(subjects => {
    res.render('add-teacher', {subject: subjects})
  })
})

router.post('/add', function (req, res) {
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    id_subject: req.body.id_subject
  }
  models.Teacher.create(obj).then(students => {
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', function (req,res) {
  models.Teacher.findById(req.params.id).then(teachers => {
    models.Subject.findAll().then(subjects => {
      res.render('edit-teacher', {data_teacher: teachers, data_subject: subjects})

    })
  })
})

router.post('/edit/:id', function (req, res) {
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    id_subject: req.body.id_subject
  }
  models.Teacher.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(teachers => {
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', function (req, res) {
    models.Teacher.destroy({
      where: {
        id: req.params.id
      }
    }).then(teachers => {
      res.redirect('/teachers')
    })
})

router.get('')

module.exports = router
