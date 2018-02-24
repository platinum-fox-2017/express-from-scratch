const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Body Parser
app.use(bodyParser.urlencoded({extended:false}))

// View
app.set('view engine','ejs')

const index = require('./routes/index')
const student = require('./routes/student')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')

// Use
app.use('/',index)
app.use('/student',student)
app.use('/teacher',teacher)
app.use('/subject',subject)

app.listen(3000,()=>{
    console.log(`ready to aboard`)
})