'use strict'

const routes = require('express').Router();
const model = require('../models');

routes.get('/', (req, res) => {
  model.Teacher.findAll({
    include: [{ model: model.Subject }]
  })
    .then(teachers => {
      res.render('teacher.ejs', { data: teachers });
    })
    .catch(err => {
      console.log(err);
    })
});

routes.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  res.render('teacher-edit.ejs', {id: id})
})

routes.post('/:id/edit', (req, res) => {
  let id = req.params.id;
  let names = req.body.name;
  let emails = req.body.email;
  let objToWrite = {name: names, email: emails};
  model.Teacher.update(objToWrite, { where: { id: id } })
    .then(teachers => {
      res.redirect('/teacher');
    })
    .catch(err => {
      
    })
});

routes.get('/add', (req, res) => {
  res.render('teacher-insert.ejs')
});

routes.post('/add', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  model.Teacher.create({
    name: name,
    email: email,
    SubjectId: 2
  }).then(teacher=>{
      res.redirect('/teacher');
    })
    .catch(err=>{
      console.log(err)
    });
});

routes.post('/:id/delete', (req, res) => {
  let id = req.params.id;
  model.Teacher.destroy({
    where: {id: id}
  })
  setTimeout(()=>{
    res.redirect('/teacher')
  }, 2000)
})

module.exports = routes;