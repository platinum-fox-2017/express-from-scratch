'use strict'

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();
app.set('views', __dirname+'/views/');
app.set('view engine','ejs');
// Body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));



// Routing
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
