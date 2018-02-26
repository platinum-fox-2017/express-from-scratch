const routes    = require('express').Router();
const models    = require('../models');
const students  = require('./students');
const teachers  = require('./teachers');
const subjects  = require('./subjects');


routes.get('/', (req,res) => {res.render('home')});
routes.use('/students', students);
routes.use('/teachers', teachers);
routes.use('/subjects', subjects);

module.exports = routes;