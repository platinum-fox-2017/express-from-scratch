const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', function(request,response) {
  models.Subject.findAll({raw:true}).then((dataSubject)=>{
    let obj = {
      title: 'SUBJECTS',
      subjects: dataSubject
    }
    response.render('subjects.ejs',obj);
  });
});

module.exports = routes;
