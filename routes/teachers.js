const routes = require('express').Router()
const model = require('../models')



routes.get('/', function(request, response){
    model.Teacher.findAll({
        order: [['id','ASC']],
        include: [{
          model: model.Subject
        }]
      })
      .then(teachers => {
        response.render('listTeacher',{teachers:teachers});
        // response.send(teachers)
      });
});

routes.get('/add', function(request, response){
  // response.send('Form Guru')
  response.render('formTeacher',{})
});

routes.post('/add', function(request, response){
  // response.send(request.body);
  model.Teacher.create({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
  })
      .then(teachers => {
        response.redirect('/teachers')
      }).catch(err=>{
        response.send(err)
      });
})


routes.get('/update/:id', function (request,response) {
  model.Teacher.findById(request.params.id).then(teachers => {
    model.Subject.findAll().then(subjects => {
      response.render('formUpdateTeacher', {data_teacher: teachers, data_subject: subjects})
      // response.send(teachers)

    })
  })
})


routes.post('/update/:id', function (request, response) {
  let obj = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    SubjectId:request.body.SubjectId
  }
  model.Teacher.update(obj, {
    where: {
      id: request.params.id
    }
  }).then(teachers => {
    response.redirect('/teachers')
    }).catch(err=>{
      response.send(err)
    });
  })

routes.get('/delete/:id', function (request, response) {
  model.Teacher.destroy({
    where: {
      id: request.params.id
    }
  }).then(data => {
    response.redirect('/teachers')
    }).catch(err=>{
      response.send(err)
    });
  })





module.exports = routes