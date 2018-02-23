const express = require('express');
const app = express()


app.get('/', function (req, res) {
  res.send('I love u')
})

app.listen(3000, console.log('MASUK DI 3000'))
