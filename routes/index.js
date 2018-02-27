'use strict'

const routes = require('express').Router();
const routesTeacher = require('./teachers.js');
const routesSubject = require('./subject.js');
const routesStudent = require('./students.js');

routes.get('/', (req, res) => {
    res.render('index.ejs');
});

routes.use('/teachers',routesTeacher);
routes.use('/subjects',routesSubject);
routes.use('/students', routesStudent);




module.exports = routes;
