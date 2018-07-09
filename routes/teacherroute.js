module.exports = (function() {
    'use strict';
    var teachs = require('express').Router();
    const model = require('../models')


    teachs.get('/', function (req, res) {
      model.teacher.findAll({raw:true}).then(datas => {
        res.render('teachers',{data:datas});
      });
    });

    teachs.get('/formtambahguru', function (req, res) {
      res.render('add-guru')
    });

    teachs.post('/tambahguru', function (req, res) {
      model.teacher.create({first_name:req.body.firstname,last_name:req.body.lastname,email:req.body.email}).then(data => {
        res.redirect('/teachers')
      })
    })

    teachs.get('/update/:id', function (req, res) {
     model.teacher.findById(req.params.id).then(teachers => {
        res.render('edit-teachers',{data:teachers})
     })
    });

   teachs.post('/editteacher/:id', function (req, res) {
     let obj = {
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       email: req.body.email
     }
     model.teacher.update(obj, {where: {id: req.params.id}}).then(teach => {
       res.redirect('/teachers')
     })
   })


    teachs.get('/delete/:id', function (req, res) {
        model.teacher.destroy({ where: { id: req.params.id} }).then(data => {
        res.redirect('/teachers')
        })
    })

    return teachs;
})();
