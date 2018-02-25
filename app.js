'use strict'

const express = require('express');
const routes = require('./routes');
const PORT = 3000;


let app = express();
// Routes application
app.use('/',routes);

app.get('/', function (req, res) {
    res.send("I love Hacktiv8")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
