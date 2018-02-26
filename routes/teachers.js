const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/', function(request,response) {
  models.Teacher.findAll({include:[{model:models.Subject}],order:sequelize.literal('id ASC')})
  .then((dataTeacher)=>{
    let obj = {
      title: 'TEACHERS',
      teachers: dataTeacher
    }
    response.render('teachers.ejs',obj);
  });
});

routes.get('/add', function(request, response){
  let obj = {
    title: 'Form Teacher',
    formAction: '/teachers/add',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    subjectId: ''
  }
  response.render('teachersForm.ejs', obj);
})

routes.post('/add', function(request, response){
  models.Teacher.create({
    first_name: request.body.newFirstName,
    last_name: request.body.newLastName,
    email: request.body.newEmail,
    SubjectId: request.body.newSubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    response.redirect('/teachers');
  })
})

routes.get('/edit/:id', function(request, response){
  models.Teacher.findById(request.param('id')).then(dataTeacher => {
    let obj = {
      title: 'Form Teacher',
      formAction: '/teachers/edit',
      id: dataTeacher.id,
      firstName: dataTeacher.first_name,
      lastName: dataTeacher.last_name,
      email: dataTeacher.email,
      subjectId: dataTeacher.SubjectId
    }
    response.render('teachersForm.ejs', obj)
  })
})

routes.post('/edit', function(request, response){
  models.Teacher.update({
    first_name: request.body.newFirstName,
    last_name: request.body.newLastName,
    email: request.body.newEmail,
    SubjectId: request.body.newSubjectId
  }, { where: { id: request.body.id }
  }).then(function(){
    response.redirect('/teachers')
  })
})

routes.get('/delete/:id', function(request, response){
  models.Teacher.destroy({
    where: {
      id: request.param('id')
    }
  }).then(function(){
    response.redirect('/teachers')
  })
})

module.exports = routes;
