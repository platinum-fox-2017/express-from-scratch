const express = require('express')
const body = require('body-parser')
const app = express()

let index = require('./routers/index')
let teacher = require ('./routers/teachers')
let student = require ('./routers/students')
let subject = require ('./routers/subject')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(body.json())
app.use(body.urlencoded({ extended: false }))

app.use('/teachers',teacher)
app.use('/students',student)
app.use('/subjects',subject)
app.use('/',index)







app.listen(3000, function(){
  console.log('AYE AYE CAPT:3000');
})
