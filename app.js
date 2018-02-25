'use strict'

const express = require('express');
const app = express();
const routes = require('./routes');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log('Connected to server')
})

//  Connect all our routes to our application
app.use('/', routes);
app.use('/student', student);
app.use('/teacher', teacher);
app.use(express.static('public'))

app.set('viee engine', 'ejs');