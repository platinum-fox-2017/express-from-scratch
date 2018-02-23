const express = require('express');
const app = express()
const School = require('./routers/')

app.set('view engine','ejs')
app.set('views','./views')

app.get('/',School)
app.get('/form',School)


app.listen(3000,console.log('Hellow World!'));
