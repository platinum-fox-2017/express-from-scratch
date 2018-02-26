const routes = require('express').Router()
const model = require('../models')
const student = require('./student')
const teachers = require('./teachers')
const subject = require('./subject')


routes.get('/', function(request, response){
    // response.send('Menampilkan profile sekolahan yang akan kamu buat seperti halaman home jika kalian masuk ke web sekolahan')
    response.render('home')
})

routes.get('/home', function(request, response){
    response.render('home')
    
})

// routes.get('/student', function(request, response){
    // response.send('menampilkan form untuk menginput data student')
// })

// routes.post('/student', function(request, response){
//     response.send('menerima data form untuk add student')
    
// })

routes.use('/teachers', teachers)
routes.use('/student', student)
routes.use('/subject', subject)


module.exports = routes