'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routesIndex = require('./routes/index.js')

// Controller
const Student = require('./controller').Student
// Student.methods(){}

// TEMPLATE ENGINE
app.set('view engine', 'ejs')

// PARSER
app.use(bodyParser.urlencoded({ extended: false }));

// PUBLIC FOLDER
app.use(express.static('public'))

// ROUTER INDEX SET
app.use('/', routesIndex)


// STUDENTS CRUD CALL
let argv = process.argv;
// Controller.

// RUN
app.listen(3003, ()=>{
  console.log('listening on PORT 3003');
})
