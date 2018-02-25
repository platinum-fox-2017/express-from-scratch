var express = require('express');
var bodyParser = require('body-parser')
var routers = require('./routes/index')

var app = express();

// setting template engine
app.set('view engine', 'ejs');

// setting body parser
app.use(bodyParser.urlencoded({ extended: false }))

// external routes
app.use('/', routers);

app.listen(3000, function(err){
    console.log('Apps terhubung ke 3000')
})