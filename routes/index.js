'use strict'

const bodyParser = require('body-parser');
const routes = require('express').Router();
const controller = require('../server/controller')

routes.get('/', function (request, respond) {
    controller.homePage(respond);
    // respond.send("I love hacktiv8!");
})

routes.use('/subject', require('./subject'));
routes.use('/teacher', require('./teacher'));
routes.use('/student', require('./student'));

module.exports = routes;