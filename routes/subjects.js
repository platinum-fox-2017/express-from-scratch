const express = require('express')
const route = express.Router()
const Subject = require('../controller/index.js').Subject;

// /subject
route.get('/', (req, res)=>{
  Subject.tableResponse(res)
  // res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})


module.exports = route
