const express = require('express');
const router = express.Router();
const Model = require('../models')
const Subject = Model.Subject

router.get('/',(req,res) => {
  Subject.findAll({
    include: [ Model.Teacher , Model.Student]
  })
  .then(subjects => {
    // let a = JSON.parse(JSON.stringify(subjects))
    // console.log(a);
    res.render('subject',{data: subjects})
  })
  // .cath(err => {
  //   console.log(err)
  // })
})

router.post('/',(req,res) => {
  let objSubject = req.body
  Subject.create(objSubject)
  .then(() => {
    res.redirect('/subject')
  })
  // .cath(err => {
  //   res.send(err)
  // })
})

router.get('/edit/:id',(req,res) => {
  let id = req.params.id
  Subject.findById(id)
  .then(dataSubject => {
    res.render('subject-edit',{subject: dataSubject})
  })
})

router.post('/edit/:id',(req,res) => {
  let inputId = req.params.id
  let objSubject = req.body
  Subject.update(objSubject,{
    where: {id: inputId}
  })
  .then(subjectUpdate => {
    res.redirect('/subject')
  })
})

router.get('/delete/:id',(req,res) => {
  let inputId = req.params.id
  Subject.destroy({
    where: {id: inputId}
  })
  .then(() => {
    res.redirect('/subject')
  })
})

router.get('/:id/enrolledstudents',(req,res) => {
  let inputId = req.params.id
  Model.student_subject_detail.findAll({
    where: {subjectId: inputId},
    include: [ Model.Student, Model.Subject ]
  })
  .then((data) => {
    res.send(data)
    // res.render('add-score', {data})
  })
})

router.get('/:idSubject/:idStudent/givescore',(req,res) => {
  let inputSubjectId = req.params.idSubject
  let inputStudentId = req.params.idStudent
  Model.student_subject_detail.findOne({
    include: [ Model.Student, Model.Subject ],
    where: {
      studentId: inputStudentId,
      subjectId: inputSubjectId
    }
  })
  .then(data => {
    // res.render('give-score',data)
    // res.send(data)
    console.log(data);
  })
})

router.post('/:id/givescore',(req,res) => {
  let inputId = req.params.id
  let objScore = req.body
  res.send(inputId)
  // Model.student_subject_detail.update(objScore, {
  //   where: { id: inputId }
  // })
  // .then(updated => {
  //   res.send(updated)
  // })
})
module.exports = router;
