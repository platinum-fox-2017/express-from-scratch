const express = require('express');
const router = express.Router();
const Model = require('../models')
const Teacher = Model.Teacher
const Subject = Model.Subject

router.get('/',(req,res) => {
  Teacher.findAll({
    include:[ Subject ]
  })
  .then(teachers => {
    // console.log(JSON.parse(JSON.stringify(teachers)));
    res.render('teacher',{teachers: teachers})
  })
  // .cath(err => {
  //   console.log(err)
  // })
})

router.post('/',(req,res) => {
  let objTeacher = {
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  }
  Teacher.create(objTeacher)
  .then(() => {
    res.redirect('/teacher')
  })
  // .cath(err => {
  //   res.send(err)
  // })
})

router.get('/edit/:id',(req,res) => {
  let id = req.params.id
  Teacher.findById(id)
  .then(dataTeacher => {
    res.render('teacher-edit',{teacher: dataTeacher})
  })
})

router.post('/edit/:id',(req,res) => {
  let inputId = req.params.id
  let objTeacher = req.body
  Teacher.update(objTeacher,{
    where: {id: inputId}
  })
  .then(teacherUpdate => {
    res.redirect('/teacher')
  })
})

router.get('/delete/:id',(req,res) => {
  let inputId = req.params.id
  Teacher.destroy({
    where: {id: inputId}
  })
  .then(() => {
    res.redirect('/teacher')
  })
})

module.exports = router;
