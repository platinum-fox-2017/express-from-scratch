const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/', function(request,response){
  models.Subject.findAll({include:[{model:models.Teacher}],
    order:sequelize.literal('id ASC')}).then((dataSubject)=>{
      let obj = {
        title: 'SUBJECTS',
        subjects: dataSubject
      }
      response.render('subjects/subjects.ejs',obj);
      // response.send(dataSubject);
  });
});

routes.get('/:id/enrolled', function(request,response){
  models.Subject.findAll({include:[{model:models.Student}],order:sequelize.literal('first_name ASC'),
    where:{id:request.param('id')}
  }).then((dataSubject)=> {
    let obj = {
      title: 'ENROLLED STUDENT',
      subjects: dataSubject
    }
    response.render('subjects/enrolled.ejs',obj)
    // response.send(dataSubject)
  })
})

routes.get('/:studentId/:subjectId/givescore', function(request,response){
  models.StudentSubject.findAll({
    where:
    {StudentId:request.param('studentId'),
     SubjectId:request.param('subjectId')}
  }).then((dataStudentSubject)=> {
    let obj = {
      title: 'GIVE SCORE',
      formAction: '/subjects/givescore',
      studentId: dataStudentSubject[0].StudentId,
      subjectId: dataStudentSubject[0].SubjectId,
      score: dataStudentSubject[0].score
    }
    response.render('subjects/givescore.ejs',obj)
    // response.send(dataStudentSubject)
  })
})

routes.post('/givescore',function(request,response){
  models.StudentSubject.update({
    score: request.body.newScore
  },{where:
    {StudentId : request.body.studentId,
     SubjectId : request.body.subjectId}
  }).then(function(){
    response.redirect('/subjects')
  })
})

module.exports = routes;
