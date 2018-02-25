const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', function(request,response) {
  models.Teacher.findAll({raw:true}).then((dataTeacher)=>{
    let obj = {
      title: 'TEACHERS',
      teachers: dataTeacher
    }
    response.render('teachers.ejs',obj);
  });
});

module.exports = routes;
