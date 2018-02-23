'use strict'

const express = require('express');
const app = express();

// const app = require('express')();
// const routes = require('./routes')

// app.use('/', routes);

app.get('/', (req, res) => {
    res.send('I love Hacktiv8')
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
});