'use strict'

const express = require('express')

let app = express()

//ROUTES
app.get('/', function (request, response) {
    response.send("I love Hackiv8!")
})


app.listen(3000)