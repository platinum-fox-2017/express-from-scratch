'use strict'

const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

app.listen(port, log =>{
    console.log(`App is running on port: ${port}`)
})

app.use('/', routes)

