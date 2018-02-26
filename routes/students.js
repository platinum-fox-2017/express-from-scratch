const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', function(request,response) {
  models.Student.findAll({raw:true}).then((dataStudent)=>{
    let obj = {
      title: 'STUDENTS',
      students: dataStudent
    }
    response.render('students.ejs',obj);
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
  response.render('studentsForm.ejs', obj);
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
      response.render('studentsForm.ejs', obj)
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

module.exports = routes;
