'use strict'

const express = require('express');
let app = express();

app.get('/',function(request,response){
  response.send('I Love Hacktiv8!');
})

app.listen(3000);
