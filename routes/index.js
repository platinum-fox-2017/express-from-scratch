const express = require('express')
const router = express.Router()


// Menampilkan profile sekolahan yang akan kamu buat seperti halaman home jika kalian masuk ke web sekolahan
router.get('/', (req, res)=>{
  // res.send('HelloWorld from Routes')
  res.render('home.ejs', { title:'HOME PAGE', h1:'HELLO HOME PAGE'})
})


// test
router.get('/routing', (req, res)=>{
  // res.send('This is Routing page')
  res.render('home.ejs', { title:'ROUTING PAGE', h1:'HELLO ROUTING PAGE'})
})


// menampilkan form untuk menginput data student
router.get('/student', (req, res)=>{
  res.render('form.ejs', { title:'Student', h1:'Student Data'})
})
// menerima data form untuk add student
router.post('/send', (req, res)=>{
  // console.log(req.body);
  let studentName = req.body.studentName;
  let studentAge = req.body.age
  res.render('home.ejs', { title:'Student', h1:`Student Name : ${studentName} Age : ${studentAge}`})
})


// menampilkan data teachers dengan menggunakan table html
router.get('/teachers', (req, res)=>{
  res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})

module.exports = router
