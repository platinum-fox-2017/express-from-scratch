'use strict'
const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
// const routes = express.Routes()

const PORT = 8000

// SETTING BODY PARSER
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

// SETTING TEMPLATE ENGINE
// app.set ('view engine', 'ejs')

// SETTING STATIC FILES
app.use(express.static('public'))

// ROUTES
// app.get('/', (request, response) => {
//     response.render('home.ejs')
// })

app.use('/', require('./routes'))

// module.exports = app









// app.get('/register-success.html', (request, response) => {
//     response.render('register-success.ejs')
// })


//-----------------------------------
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})


