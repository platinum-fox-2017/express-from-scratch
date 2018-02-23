'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const routesIndex = require('./routes/index.js')
const routeUser = require('./routes/user.js')

// TEMPLATE ENGINE
app.set('view engine', 'ejs')

// PARSER
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'))
app.use('/', routesIndex)
// app.use('/user', routeUser)





app.listen(3003, ()=>{
  console.log('listening on PORT 3003');
})
