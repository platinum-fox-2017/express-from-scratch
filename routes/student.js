'use strict'

const routes = require('express').Router();
const model = require('../models');

routes.get('/', (req, res) => {
  model.Student.findAll()
    .then(students => {
      res.render('student.ejs', {data: students})
    })
    .catch(err => {
      console.log(err);
    })
});

routes.get('/add', (req, res) => {
  res.render('student-insert.ejs')
});

routes.post('/add', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  model.Student.create({
    name: name,
    email: email,
    phone: phone
  }).then(student=>{
      res.redirect('/student');
    })
    .catch(err=>{
      console.log(err)
    });
});

routes.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  res.render('student-edit.ejs', {id: id})
})

routes.post('/:id/edit', (req, res) => {
  let id = req.params.id;
  let names = req.body.name;
  let emails = req.body.email;
  let phones = req.body.phone;
  let objToWrite = {name: names, email: emails, phone: phones};
  model.Student.update(objToWrite, { where: { id: id } })
    .then(students => {
      res.redirect('/student');
    })
    .catch(err => {
      console.log(err);
    })
});

routes.post('/:id/delete', (req, res) => {
  let id = req.params.id;
  model.Student.destroy({
    where: {id: id}
  })
  setTimeout(()=>{
    res.redirect('/student')
  }, 2000)
})

routes.get('/:id/add-subject', (req, res) => {
  let id = req.params.id;
  model.Student.findOne({where :{id: id}})
    .then(student => {
      model.Subject.findAll()
        .then(subjects => {
          res.render('student-add-subject.ejs', {student: student.dataValues, subjects: subjects})
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
})

routes.post('/:id/add-subject', (req, res) => {
  //let id = req.params.id;
  let studentId = req.params.id;
  let subjectId = req.body.SubjectId;
  let objToWrite = {StudentId: studentId, SubjectId: subjectId};
  model.StudentSubject.create(objToWrite)
    .then(students => {
      res.redirect('/student');
    })
    .catch(err => {
      console.log(err);
    })
});
  
module.exports = routes;