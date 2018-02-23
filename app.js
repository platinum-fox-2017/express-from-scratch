const express = require('express');
const Sequelize = require('sequelize');
const models = require('./models');
const app = express();

app.set('view engine', 'ejs');

const index = require('./routes/index.js');
const user = require('./routes/user.js');
app.use('/', index);
app.use('/user', user);

app.listen(3000, console.log('AYE AYE CAPTAIN!'));
