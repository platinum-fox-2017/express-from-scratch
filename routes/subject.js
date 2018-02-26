'use strict'

const routes = require('express').Router();
const model = require('../models');

routes.get('/', (req, res) => {
  model.Subject.findAll({
      include: [{ model: model.Teacher }]
    })
    .then(subjects => {
      res.render('subject.ejs', {data: subjects})
      //res.send(subjects)
      //console.log(subjects);
    })
    .catch(err => {
      console.log(err);
    })
});

routes.get('/add', (req, res) => {
  res.render('subject-insert.ejs')
});

routes.post('/add', (req, res) => {
  let name = req.body.name;
  model.Subject.create({
    subjectName: name,
  }).then(subject=>{
      res.redirect('/subject');
    })
    .catch(err=>{
      console.log(err)
    });
});

routes.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  res.render('subject-edit.ejs', {id: id})
})

routes.post('/:id/edit', (req, res) => {
  let id = req.params.id;
  let names = req.body.name;
  let objToWrite = {subjectName: names};
  model.Subject.update(objToWrite, { where: { id: id } })
    .then(subjects => {
      res.redirect('/subject');
    })
    .catch(err => {
      
    })
});

routes.post('/:id/delete', (req, res) => {
  let id = req.params.id;
  model.Subject.destroy({
    where: {id: id}
  })
  setTimeout(()=>{
    res.redirect('/subject')
  }, 2000)
})

routes.get('/:id/enrolled-student', (req, res) => {
  let id = req.params.id;
  model.StudentSubject.findAll({
    include:[{
      model: model.Subject
    },{
      model: model.Student
    }],
    where: {SubjectId: id}
  }).then(data => {
    // res.send(data)
    res.render('enrolled-student.ejs', {data: data})
  })
  // res.render('enrolled-student.ejs')
  
})
module.exports = routes;