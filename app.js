'use strict'
const express = require('express')
const app = express()
const faker = require('faker');
const bodyParser = require('body-parser')
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes/index')
const student = require('./routes/student')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')

app.use('/', index)
app.use('/student', student)
app.use('/teacher', teacher)
app.use('/subject', subject)


app.listen(3000, () => {
    console.log('App is now listening on port 3000');
})