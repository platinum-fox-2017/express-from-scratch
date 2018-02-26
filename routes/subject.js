const routes = require('express').Router()
const model = require('../models')


routes.get('/', function(request, response){
    model.Subject.findAll({
        order: [['id','ASC']],
        include:{model: model.Teacher}
      })
      .then(subject => {
        response.render('listSubject',{data_subject:subject});
        // response.send(subject)
      });
});

routes.get('/add', function(request, response){
  response.render('formSubject',{})
});

routes.post('/add', function(request, response){
  model.Subject.create({
    subject_name: request.body.subject_name,
  })
      .then(subjects => {
        response.redirect('/subject')
      }).catch(err=>{
        response.send(err)
      });
});

routes.get('/delete/:id', function (request, response) {
  model.Subject.destroy({
    where: {
      id: request.params.id
    }
  }).then(data => {
    response.redirect('/subject')
    }).catch(err=>{
      response.send(err)
    });
  })



routes.get('/:id/enrolledstudents',(request,response) => {
  model.StudentSubject.findAll({
      where : {SubjectId : request.params.id},
      attributes: ['id','score'],
      include : [{model : model.Subject}, {model : model.Student}]
  })
  .then(enrolledstudents=> {
      response.send({enrolledstudents})
  })
  .catch(err => {
      response.send(err);
  })
})

routes.get('/:idstudentsubject/givescore',(request,response) => {
    model.StudentSubject.findOne({
        where : {id : request.params.idstudentsubject},
        attributes: ['id','score'],
        include : [{model: model.Subject}, {model : model.Student}]
    })
    .then(subjectstudent => {
      response.send(subjectstudent)
      // response.render('giveScore',{subjectstudent : subjectstudent});
    })
    .catch(err => {
      response.send(err);
    })
})

routes.post('/:idstudentsubject/givescore',(request,response) => {
    model.SubjectStudent.update(
        {
            score: request.body.score
        },
        {where : {id : request.params.idstudentsubject}}
    )
    .then(success => {
      response.redirect('/subjects');
    })
    .catch(err => {
      response.send(err);
    })
})


module.exports = routes