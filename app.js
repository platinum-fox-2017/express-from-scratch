const express = require('express');

const app = express()

const bodyParser = require('body-parser')

const teacher = require('./routes/teacher')
const subject = require('./routes/subject')
const student = require('./routes/student')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)



app.listen(3000, console.log('MASUK DI 3000'))
