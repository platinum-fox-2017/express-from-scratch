const express = require('express')
const route = express.Router();
// /student
route.get('/', (req, res)=>{
  res.render('form.ejs', { title:'Student', h1:'Student Data'})
});

route.post('/send', (req, res)=>{
  // console.log(req.body);
  let studentName = req.body.studentName;
  let studentAge = req.body.age;
  res.render('home.ejs', { title:'Student', h1:`Student Name : ${studentName} Age : ${studentAge}`});
});

module.exports = route




// module.exports = function(app){
//   'use strict'
//
//   // menampilkan form untuk menginput data student
//   app.get('/student', (req, res)=>{
//     res.render('form.ejs', { title:'Student', h1:'Student Data'})
//   })
//   // menerima data form untuk add student
//   app.post('/send', (req, res)=>{
//     // console.log(req.body);
//     let studentName = req.body.studentName;
//     let studentAge = req.body.age
//     res.render('home.ejs', { title:'Student', h1:`Student Name : ${studentName} Age : ${studentAge}`})
//   })
// }
