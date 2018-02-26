const routes = require('express').Router()
const model = require('../models')



routes.get('/', function(request, response){
    // response.send('form murid')
    model.Student.findAll({
        order: [['id','ASC']],
      })
      .then(students => {
        response.render('listStudent',{data_students:students});
        // response.send(students)
      }).catch(err=>{
        response.send(err)
      });
});


routes.get('/add', function(request, response){
    response.render('formStudent',{})
  });

routes.post('/add', function(request, response){
    model.Student.create({
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
    })
        .then(students => {
          response.redirect('/student')
        }).catch(err=>{
          response.send(err)
        });
  });

  routes.get('/update/:id', function (request,response) {
    model.Student.findById(request.params.id).then(students => {
        response.render('formUpdateStudent', {data_students: students})
        // response.send(Students)
  
    })
  })
  
  
  routes.post('/update/:id', function (request, response ) {
    let obj = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
    }
    model.Student.update(obj, {
      where: {
        id: request.params.id
      }
    }).then(Students => {
      response.redirect('/student')
      }).catch(err=>{
        response.send(err)
      });
    })

  
  routes.get('/delete/:id', function (request, response) {
  model.Student.destroy({
    where: {
      id: request.params.id
    }
  }).then(data => {
    response.redirect('/student')
    }).catch(err=>{
      response.send(err)
    });
  })

  routes.get('/:id/addsubject',(request,response) => {
    model.Student.findOne({
        where : { 
          id : request.params.id
        }
    }).then(students => {
      // response.send(students)
        model.Subject.findAll()
        .then(subjects => {
            response.render('formAddSubject', {students : students, subjects : subjects});
            // response.send({students, subjects})
        })
    })
    .catch(err => {
      response.send(err);
    });
  })

  routes.post('/:id/addsubject',(request,response) => {
    model.StudentSubject.create({
        StudentId : request.params.id,
        SubjectId : request.body.SubjectId
    })
    .then(success=>{
      response.redirect('/student');
    })
    .catch(err => {
      response.send(err);
    });
  })

    

module.exports = routes