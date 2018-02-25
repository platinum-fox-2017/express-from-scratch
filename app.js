var express = require('express');
var app = express();
var routes = require('./routes/externalRoutes');
const bodyParser=require('body-parser');
app.set('view engine','ejs')
// Our external route
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.use('/', routes);

// Listen to port 5000
app.listen(3000,console.log('Dev app listening on port 3000!'));
