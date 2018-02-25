'use strict'

const express = require('express');
var bodyParser = require('body-parser');

const model = require('./models');

const app = express();
const routes = require('./routes/index');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', routes);
app.use('/students', students);
app.use('/teachers', teachers);
// app.use('/subjects', subjects);

app.listen(PORT, () => {
    console.log('App listening on port 3000')
});