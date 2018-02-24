'use strict'
const express = require('express')
let app = express()
app.set('view engine', 'ejs')
const index = require('./routes/index.js')
const teacher = require('./routes/teacher.js')
const subject = require('./routes/subject')

app.use('/', index)
app.use('/teacher', teacher)
app.use('/subject', subject)

app.listen(3000)