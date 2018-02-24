const express = require('express')
const route = express.Router();


// /teacher
// menampilkan data teachers dengan menggunakan table html
route.get('/', (req, res)=>{
  res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})


module.exports = route
