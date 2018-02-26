'use strict';
const model = require('../models');
module.exports = (function() {
  // app.set('view engine', 'ejs')
const subjectsRoute = require('express').Router();

subjectsRoute.get('/', function (req, res) {
  model.Subject.findAll({
    order: ['id'],
    include: [{
      model: model.Teacher
    }]
  }).then(subjects => {
    let data = JSON.parse(JSON.stringify(subjects))
     // res.send(subjects)
    res.render('listSubject.ejs', {data_subjects: subjects})
  })
})

subjectsRoute.get('/:id/enrolledstudents',function(req,res){
  model.StudentSubject.findAll({
  where: {
    id_subject: req.params.id,
  },
  include:
  [{
      model: model.Student
    },
  {
      model: model.Subject
  }]
  }).then(subjects=>{
    let data = JSON.parse(JSON.stringify(subjects))
    res.render('updateScore.ejs',{data_subjects: subjects})
    // res.send(subjects)
  })
})

subjectsRoute.get('/:id/givescore', function (req, res){
  model.StudentSubject.findAll({
  where: {
    id: req.params.id,
  },
  include:
  [{
      model: model.Student
    },
  {
      model: model.Subject
  }]
  }).then(subjects=>{
    let data = JSON.parse(JSON.stringify(subjects))
    res.render('formUpdateScore.ejs',{data_subjects: subjects})
     // res.send(subjects)
  })
});


subjectsRoute.post('/:id/givescore', function (req, res) {
  let obj = {
    score: req.body.score,
  }
  model.StudentSubject.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/subjects')
    }).catch(err=>{
      res.send(err)
    });
  })



    return subjectsRoute;
})();
