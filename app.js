'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

routes(app);

app.listen(port, function() {
 console.log(`Server listening on port ${port}…`);
});