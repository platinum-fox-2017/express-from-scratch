const express = require('express')
const route = express.Router();
const Teacher = require('../controller/index.js').Teacher;

// /teacher
// menampilkan data teachers dengan menggunakan table html
route.get('/', (req, res)=>{
  // display table in view with teacher ejs via controller
  Teacher.tableResponse(res)
  // res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})


module.exports = route
