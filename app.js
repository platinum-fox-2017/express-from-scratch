'use strict'

const express = require('express');
let app = express();
const routes = require('./routes'); // require folder routes

// app.get('/',function(req,res){
//   res.send('I Love Hacktiv8!');
// });
app.use('/', routes); // masuk ke file routes pake slash => localhost:4756/

app.listen(4756, () => {
  console.log('App listening on port 4756');
});
