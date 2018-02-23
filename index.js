const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',router);
app.set('view engine','ejs');
// parse application/x-www-form-urlencoded
const port = 3000;
app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
