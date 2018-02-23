'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 8000

// TEMPLATE ENGINE

app.get('/', (request, response) => {
    response.send('Hello World')
})

app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
})