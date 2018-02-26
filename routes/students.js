'use strict';
const model = require('../models');
module.exports = (function() {
  // app.set('view engine', 'ejs')
const studentsRoute = require('express').Router();


    studentsRoute.get('/', function (req, res) {
      model.Student.findAll({
        order: [['id','ASC']],
      })
      .then(data => {
        res.render('listStudent.ejs',{data:data});
      });
    });

    studentsRoute.get('/add', function (req, res){
        res.render('form.ejs',{});
    });

    studentsRoute.post('/add', (req, res) => {
      let obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }
      model.Student.create(obj)
      .then(data => {
          res.redirect('/students')
      }).catch(err=>{
          res.send(err)
      });
    });

    studentsRoute.get('/:id/addsubject', function(req, res){
      model.Student.findById(req.params.id).then(data => {
        model.Subject.findAll().then(data_subject=> {
          res.render('formSubject.ejs',{data:data, data_subject:data_subject});
        })
      }).catch(err=>{
          res.send(err)
      });
    })

    studentsRoute.post('/:id/addsubject', (req, res) => {
      let obj = {
        id_student: req.params.id,
        id_subject: req.body.id_subject,
      }
      model.StudentSubject.create(obj)
      .then(data => {
          res.redirect('/students')
      }).catch(err=>{
          res.send(err)
      });
    });


    studentsRoute.get('/update/:id', function (req, res){
      model.Student.findById(req.params.id).then(data => {
          res.render('formUpdate.ejs',{data:data});
      }).catch(err=>{
          res.send(err)
      });
    });

    studentsRoute.post('/update/:id', function (req, res) {
      let obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }
      model.Student.update(obj, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.redirect('/students')
        }).catch(err=>{
          res.send(err)
        });
      })

      studentsRoute.get('/delete/:id', function (req, res) {
        model.Student.destroy({
          where: {
            id: req.params.id
          }
        }).then(data => {
          res.redirect('/students')
          }).catch(err=>{
            res.send(err)
          });
        })

    return studentsRoute;
})();
