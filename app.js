const express = require('express');

const bodyParser = require('body-parser')

const app = express()

const user = require('./routes/user')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/user', user)
app.use('/user', user)

app.listen(3000, console.log('MASUK DI 3000'))
