const express = require('express');
const app = express()
const Home = require('./routers')
const Teacher = require('./routers/teacher')
const Subject = require('./routers/subject')
const Student = require('./routers/student')
const bodyParser = require('body-parser')

app.set('view engine','ejs')
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',Home)
app.use('/teacher',Teacher)
app.use('/subject',Subject)
app.use('/student',Student)


app.listen(3000,console.log('Success'));
