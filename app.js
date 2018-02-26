'use strict'

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const route_schools = require('./routes/school');
const route_students = require('./routes/students');
const route_teachers = require('./routes/teachers');
const route_subjects = require('./routes/subjects');

app.use('/',route_schools);
app.use('/students', route_students);
app.use('/teachers', route_teachers);
app.use('/subjects', route_subjects);


app.listen(3000);