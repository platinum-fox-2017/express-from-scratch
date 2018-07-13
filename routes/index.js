'use strict'

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('home.ejs')
  });
  
  module.exports = routes;