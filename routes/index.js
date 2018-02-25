'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()

// ROUTES
routes.get('/', (request, response) => {
    response.render('home.ejs')
})

routes.use('/add/students.html', require('./add/students.js'))
routes.use('/add/teachers.html', require('./add/teachers.js'))
routes.use('/add/subjects.html', require('./add/subjects.js'))

routes.use('/list/students.html', require('./list/students.js'))
routes.use('/list/teachers.html', require('./list/teachers.js'))
routes.use('/list/subjects.html', require('./list/subjects.js'))

module.exports = routes