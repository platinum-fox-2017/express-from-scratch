'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

//untuk melakukan setup express app
let app = express();

//mencari file ejs
app.set('views','./server/views')

//set bodyParser
app.use(bodyParser.urlencoded({ extended: false}));

// CONTOH BIKIN SETTING STATIC FILES
app.use(express.static('public'));

//untuk masuk ke web mana, masuk ke folder routes
app.use(require('./routes'));

//untuk menunjukan bahwa aplikasi kita jalan dalam localhost server, port: PORT
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

module.exports = app;