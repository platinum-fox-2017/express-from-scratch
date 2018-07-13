'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const routes = require('./routes');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const subject = require('./routes/subject');

const PORT = 4500;

app.listen(PORT, ()=>{
    console.log('Connected to server')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.set('viee engine', 'ejs');

//  Connect all our routes to our application
app.use('/', routes);
app.use('/student', student);
app.use('/teacher', teacher);
app.use('/subject', subject);
