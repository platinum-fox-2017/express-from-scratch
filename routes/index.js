const express = require('express')
const route = express.Router()

route.use('/subjects',  require('./subjects'));
route.use('/users',     require('./users'));
route.use('/students',  require('./students'));
route.use('/teachers',  require('./teachers'));

// Menampilkan profile sekolahan yang akan kamu buat seperti halaman home jika kalian masuk ke web sekolahan
route.get('/', (req, res)=>{
  // res.send('HelloWorld from Routes')
  res.render('home.ejs', { title:'HOME PAGE', h1:'HELLO HOME PAGE'})
})


// test
route.get('/routing', (req, res)=>{
  // res.send('This is Routing page')
  res.render('home.ejs', { title:'ROUTING PAGE', h1:'HELLO ROUTING PAGE'})
})


module.exports = route


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


// menampilkan data teachers dengan menggunakan table html
// router.get('/teacher', (req, res)=>{
  // res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
// })


// menampilkan data Subjects dengan menggunakan table html
// router.get('/subject', (req, res)=>{
//   res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
// })


// menampilkan data Users dengan menggunakan table html
// router.get('/user', (req, res)=>{
//   res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
// })




// function(app){
//   let routes = fs.readdirSync(_dirname);
//   routes .forEach(function(filename){
//     if (filename === 'index.js') {
//       return;
//     }
//     let name = filename.substr(0, filename.indexOf('.'));
//     require('./'+name)(app);
//   })
// }
