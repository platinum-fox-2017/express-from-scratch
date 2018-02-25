'use strict';
const model = require('../models');
module.exports = (function() {
  // app.set('view engine', 'ejs')
const students = require('express').Router();


    students.get('/', function (req, res) {
      model.Student.findAll({
        order: [['id','ASC']],
      })
      .then(data => {
        res.render('listStudent.ejs',{data:data});
      });
    });

    students.get('/add', function (req, res){
        res.render('form.ejs',{});
    });

    students.post('/add', (req, res) => {
      model.Student.create(req.body)
      .then(data => {
          res.redirect('/students')
      }).catch(err=>{
          res.send(err)
      });
    });

    students.get('/update/:id', function (req, res){
      model.Student.findById(req.params.id).then(data => {
          res.render('formUpdate.ejs',{data:data});
      }).catch(err=>{
          res.send(err)
      });
    });

    students.post('/update/:id', function (req, res) {
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

      students.get('/delete/:id', function (req, res) {
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

    return students;
})();
