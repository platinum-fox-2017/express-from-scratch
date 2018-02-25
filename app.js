const express = require('express')
const app = express()
const RouterStudent = require('./routes/student')
const RouterTeacher = require('./routes/teacher') 
const RouterSubject = require('./routes/subject')
const bodyParser = require('body-parser')


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/teacher',RouterTeacher)
app.use('/subject',RouterSubject)
app.use('/student',RouterStudent)

//----------------Home ------------------
app.get('/', function (req, res) {
  res.render('index')
})
 
app.listen(3000,console.log('server up!'))