module.exports = (function() {
    'use strict';
    var murid = require('express').Router();
    const model = require('../models')


    murid.get('/', (req, res) => {
      model.student.findAll({raw:true}).then(datas => {
        res.render('students-hasil',{data:datas});
      });
    });

    murid.get('/formstudent', (req, res) => {
      res.render('student-form');
    });

    murid.post('/tambahmurid', function (req, res) {
      model.student.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email}).then(datas => {
        res.redirect('/students-hasil')
      })
    })

    murid.get('/update/:id', function (req, res) {
     model.student.findById(req.params.id).then(students => {
       console.log(students);
        res.render('editstudents',{data:students})
     })
    });

   murid.post('/editstudents/:id', function (req, res) {
     let obj = {
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       email: req.body.email
     }
     model.student.update(obj, {where: {id: req.params.id}}).then(teach => {
       res.redirect('/students')
     })
   })

    murid.get('/delete/:id', function (req, res) {
        model.student.destroy({ where: { id: req.params.id} }).then(data => {
        res.redirect('/students')
        })
    })


    return murid;
})();
