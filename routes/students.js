const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Student.findAll().then(data => {
    res.render('students', {title: 'Students', data: data})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/add', (req, res) => {
  models.Student.findAll().then(data => {
    res.render('add_student', {title: 'Add Student', data: data})
  }).catch(err => {
    res.send(err)
  })
})

router.post('/add', (req, res) => {
  models.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).then(data => {
    res.redirect('/students')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) => {
  models.Student.findById(req.params.id).then(data => {
    res.render('edit_student', {title: 'Edit Student', data: data})
  }).catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  models.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {where: {id: req.params.id}}).then(data => {
    res.redirect('/students')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  models.Student.destroy({where : {id: req.params.id}}).then(data => {
    res.redirect('/students')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
