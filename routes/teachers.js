'use strict';
const model = require('../models');
module.exports = (function() {
  // app.set('view engine', 'ejs')
const teachers = require('express').Router();


    teachers.get('/', function (req, res) {
      model.Teacher.findAll({
        order: ['id'],
        include: [{
          model: model.Subject
        }]
      }).then(teachers => {
        let data = JSON.parse(JSON.stringify(teachers))
        // console.log(data);
        res.render('listTeacher.ejs', {data_teacher: teachers})
      })
    })



    teachers.get('/add', function (req, res){
        res.render('formTeacher.ejs',{});
    });

    teachers.post('/add', (req, res) => {
      model.Teacher.create(req.body)
      .then(data => {
          res.redirect('/teachers')
      }).catch(err=>{
          res.send(err)
      });
    });

    teachers.get('/update/:id', function (req, res){
      model.Teacher.findById(req.params.id).then(data => {
        model.Subject.findAll().then(data_subject => {
          res.render('formUpdateTeacher.ejs', {data: data, data_subject: data_subject})

        })

      }).catch(err=>{
          res.send(err)
      });
    });

    teachers.post('/update/:id', function (req, res) {
      let obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        id_subject:req.body.id_subject
      }
      model.Teacher.update(obj, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.redirect('/teachers')
        }).catch(err=>{
          res.send(err)
        });
      })

      teachers.get('/delete/:id', function (req, res) {
        model.Teacher.destroy({
          where: {
            id: req.params.id
          }
        }).then(data => {
          res.redirect('/teachers')
          }).catch(err=>{
            res.send(err)
          });
        })

    return teachers;
})();
