'use strict'

const express = require('express')
const indexRoutes = require('./routes')
const model = require('./models');
const bodyParser = require('body-parser')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.listen(port, log =>{
    console.log(`App is running on port: ${port}`)
})

app.use('/', indexRoutes)
// app.use('/teachers', teacherRoute)






