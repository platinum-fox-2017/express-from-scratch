'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()

// ROUTES
routes.get('/', (request, response) => {
    response.render('home.ejs')
})

routes.use('/add/students', require('./add/students.js'))
routes.use('/add/teachers', require('./add/teachers.js'))
routes.use('/add/subjects', require('./add/subjects.js'))

routes.use('/list/students', require('./list/students.js'))
routes.use('/list/teachers', require('./list/teachers.js'))
routes.use('/list/subjects', require('./list/subjects.js'))

module.exports = routes