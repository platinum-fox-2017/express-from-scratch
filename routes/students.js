const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/', function(request,response) {
  models.Student.findAll({include:[{model:models.StudentSubject}],
    order:sequelize.literal('first_name ASC')}).then((dataStudent)=>{
      let obj = {
        title: 'STUDENTS',
        students: dataStudent
      }
      response.render('students/students.ejs',obj);
      // response.send(dataStudent);
  });
});

routes.get('/add', function(request, response){
  let obj = {
    title: 'Form Student',
    formAction: '/students/add',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  }
  response.render('students/addEdit.ejs', obj);
})

routes.post('/add', function(request, response){
  models.Student.create({
    first_name: request.body.newFirstName,
    last_name: request.body.newLastName,
    email: request.body.newEmail,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    response.redirect('/students');
  })
})

routes.get('/edit/:id', function(request, response){
  models.Student.findById(request.param('id')).then(dataStudent => {
    let obj = {
      title: 'Form Student',
      formAction: '/students/edit',
      id: dataStudent.id,
      firstName: dataStudent.first_name,
      lastName: dataStudent.last_name,
      email: dataStudent.email,
    }
      response.render('students/addEdit.ejs', obj)
  })
})

routes.post('/edit', function(request, response){
  models.Student.update({
    first_name: request.body.newFirstName,
    last_name: request.body.newLastName,
    email: request.body.newEmail,
  }, { where: { id: request.body.id }
  }).then(function(){
    response.redirect('/students')
  })
})

routes.get('/delete/:id', function(request, response){
  models.Student.destroy({
    where: {
      id: request.param('id')
      }
  }).then(function(){
    response.redirect('/students')
  })
})

routes.get('/addSubject/:id', function(request, response){
  models.Student.findById(request.param('id')).then(dataStudent => {
    models.Subject.findAll().then(dataSubject => {
      let obj = {
        formAction: '/students/addSubject',
        title: 'Form Add Subject',
        subjects: dataSubject,
        id: dataStudent.id,
        firstName: dataStudent.first_name,
        lastName: dataStudent.last_name,
        email: dataStudent.email
      }
      response.render('students/addSubject.ejs', obj)
    })
  })
})

routes.post('/addSubject',function(request,response){
  models.StudentSubject.create({
    StudentId: request.body.id,
    SubjectId: request.body.getSubject,
    score: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    response.redirect('/students')
  })
})

module.exports = routes;
