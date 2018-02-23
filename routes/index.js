const routes = require('express').Router()

routes.get('/', function(request, response){
    response.send('Menampilkan profile sekolahan yang akan kamu buat seperti halaman home jika kalian masuk ke web sekolahan')

})

routes.get('/home', function(request, response){
    response.send('Pengen pulang ke Bandung')
    
})

routes.get('/student', function(request, response){
    response.send('menampilkan form untuk menginput data student')
    
})

routes.post('/student', function(request, response){
    response.send('menerima data form untuk add student')
    
})

routes.get('/teachers', function(request, response){
    response.send('menampilkan data teachers dengan menggunakan table html')
    
})





module.exports = routes