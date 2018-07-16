const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index.js')
const teachers = require('./routes/teachers')
const students = require('./routes/students')
const subjects = require('./routes/subjects')
 
const app = express()
app.set('view engine', 'ejs');
 
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/teachers', teachers)
app.use('/students', students)
app.use('/subjects', subjects)
app.listen(3000);
console.log('check....');