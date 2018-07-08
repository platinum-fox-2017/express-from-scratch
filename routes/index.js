const express = require('express');
const routes = express.Router();

routes.get('/', function(request,response) {
    response.send(`I Love Hacktiv8!`);
});

routes.use('/teachers', require('./teachers.js'));
routes.use('/subjects', require('./subjects.js'));
routes.use('/students', require('./students.js'));

module.exports = routes;
