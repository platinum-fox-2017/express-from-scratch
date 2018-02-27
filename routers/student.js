const express = require('express');
const router = express.Router();
const Model = require('../models')
const Student = Model.Student

router.get('/',(req,res) => {
  Student.findAll()
  .then(students => {
    res.render('student',{data: students})
  })
  // .cath(err => {
  //   console.log(err)
  // })
})

router.post('/',(req,res) => {
  let objStudent = {
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  }
  Student.create(objStudent)
  .then(() => {
    res.redirect('/student')
  })
  // .cath(err => {
  //   res.send(err)
  // })
})

router.get('/edit/:id',(req,res) => {
  let id = req.params.id
  Student.findById(id)
  .then(dataStudent => {
    res.render('student-edit',{student: dataStudent})
  })
})

router.post('/edit/:id',(req,res) => {
  let inputId = req.params.id
  let objStudent = req.body
  Student.update(objStudent,{
    where: {id: inputId}
  })
  .then(studentUpdate => {
    res.redirect('/student')
  })
})

router.get('/delete/:id',(req,res) => {
  let inputId = req.params.id
  Student.destroy({
    where: {id: inputId}
  })
  .then(() => {
    res.redirect('/student')
  })
})

router.get('/add_subject/:id',(req,res) => {
  let inputId = req.params.id
  Student.findById(inputId)
  .then(student => {
    Model.Subject.findAll()
    .then(subjects => {
      res.render('add-subject',{student, subjects})
    })
  })
})

router.post('/add_subject/:id',(req,res) => {
  let obj = {
    studentId: +req.params.id,
    subjectId: +req.body.subjectId
  }
  Model.student_subject_detail.create(obj)
  .then(() => {
    res.redirect('/student')
  })
})

module.exports = router;
