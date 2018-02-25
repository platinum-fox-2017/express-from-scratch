'use strict'

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('student.ejs')
  });
  
  module.exports = routes;