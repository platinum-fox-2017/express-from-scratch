'use strict'

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('This is teacher page')
  });
  
  module.exports = routes;