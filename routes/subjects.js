const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/', function(request,response) {
  models.Subject.findAll({include:[{model:models.Teacher}],order:sequelize.literal('id ASC')}).then((dataSubject)=>{
    let obj = {
      title: 'SUBJECTS',
      subjects: dataSubject
    }
    response.render('subjects.ejs',obj);
    // response.send(dataSubject);
  });
});

module.exports = routes;
