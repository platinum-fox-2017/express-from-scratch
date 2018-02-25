'use strict'

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


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

//untuk menunjukan bahwa aplikasi kita jalan dalam localhost server, port: PORT (npm run start:app)
app.use(logger('dev'));

module.exports = app;

//untuk menunjukan bahwa aplikasi kita jalan dalam localhost server, port: PORT
// app.listen(PORT, () => {
//     console.log(`Application is running on port ${PORT}`);
// });

// app.get('*', (request, respond) => respond.status(200).send({
//     message: 'welcome'
// }));