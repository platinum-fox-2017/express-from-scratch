'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const index = require('./routes/index')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const subject = require('./routes/subject')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.use('/',index)
app.use('/teachers',teacher)
app.use('/students',student)
app.use('/subjects',subject)

app.listen(3000, () => console.log('Example app listening on port 3000!'))