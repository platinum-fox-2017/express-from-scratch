const express = require('express')
const route = express.Router()

// /subject
route.get('/', (req, res)=>{
  res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})


module.exports = route
