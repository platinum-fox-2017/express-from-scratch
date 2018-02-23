const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.send('show all user data')
})

router.post('/', (req, res)=>{
  res.send('receive data form to input user')
})

// ### edit/:id ###
router.get('/edit/:id', (req, res)=>{
  res.send('Show specific user data to change')
})

router.post('/edit/:id', (req, res)=>{
  res.send('receive data form to update user')
})


// ### delete/:id ###
router.get('/delete/:id', (req, res)=>{
  res.send('delete data user by ID')
})


module.exports = router
