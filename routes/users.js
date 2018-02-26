const express = require('express')
const route = express.Router()


// /user
route.get('/', (req, res)=>{
  res.render('home.ejs', { title:'Teachers', h1:'Teachers Data'})
})

module.exports = route

// router.get('/', (req, res)=>{
//   res.send('show all user data')
// })
//
// router.post('/', (req, res)=>{
//   res.send('receive data form to input user')
// })
//
// // ### edit/:id ###
// router.get('/edit/:id', (req, res)=>{
//   res.send('Show specific user data to change')
// })
//
// router.post('/edit/:id', (req, res)=>{
//   res.send('receive data form to update user')
// })
//
//
// // ### delete/:id ###
// router.get('/delete/:id', (req, res)=>{
//   res.send('delete data user by ID')
// })
