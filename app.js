const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();

app.set('view engine', 'ejs');

const index = require('./routes/index.js');
const user = require('./routes/user.js');
const teachers = require('./routes/teachers.js');
const subjects = require('./routes/subjects.js');
const students = require('./routes/students.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/user', user);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000, console.log('AYE AYE CAPTAIN!'));
