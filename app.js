'use strict'

const express = require('express');
const routes  = require('./routes');
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',routes);

app.listen(PORT, () => {
    console.log('Application running on port ' + PORT);
})