"use strict"
const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const model = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',routes);
app.set('view engine', 'ejs');
app.listen(3000, () => {
  console.log('App Listening on port 3000');
});
