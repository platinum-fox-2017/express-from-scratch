'use strict'

const express = require('express')
let app = express()
let port = 3000

app.listen(port, log =>{
    console.log(`App is running on port: ${port}`)
})

