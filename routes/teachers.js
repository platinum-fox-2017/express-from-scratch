const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Teacher.findAll({
    order: ['first_name'],
    include : [{model: models.Subject}]
  }).then(data => {
    res.render('teachers', {title: 'Teachers', data: data})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/add', (req, res) => {
  models.Teacher.findAll().then(teacher => {
    models.Subject.findAll().then(subject => {
      res.render('add_teacher', {title: 'Add Teacher', teacher, subject})
    }).catch(err => {
      res.send(err)
    })
  }).catch(err => {
    res.send(err)
  })
})

router.post('/add', (req, res) => {
  models.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subjectId: req.body.subjectId
  }).then(data => {
    res.redirect('/teachers')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) => {
  models.Teacher.findById(req.params.id).then(teacher => {
    models.Subject.findAll().then(subject => {
      res.render('edit_teacher', {title: 'Edit Teacher', teacher, subject})
    }).catch(err => {
      res.send(err)
    })
  }).catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  models.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subjectId: req.body.subjectId
  }, {where: {id: req.params.id}}).then(data => {
    res.redirect('/teachers')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  models.Teacher.destroy({where : {id: req.params.id}}).then(data => {
    res.redirect('/teachers')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
