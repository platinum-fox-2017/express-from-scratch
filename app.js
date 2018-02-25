const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const routes = require('./routes')
const student = require('./routes/student.js')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes)
app.use('/student', student)
app.use('/teacher', teacher)
app.use('/subject', subject)

// Server
app.listen(PORT, ()=>{
  console.log(`connected to port ${PORT}`)
})