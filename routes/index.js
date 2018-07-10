const express = require('express');
const routes = express.Router();

routes.get('/', function(request,response) {
    response.send(`SEKOLAH MENENGAH DI ATAS AWAN \n
    Hello, Selamat datang di halaman web sekolah terbaik di DUNIA !`)
});

routes.use('/teachers', require('./teachers.js'));
routes.use('/subjects', require('./subjects.js'));
routes.use('/students', require('./students.js'));

module.exports = routes;


// routes.get('/student', function(request,response) {
//     response.render('form.ejs');
// });

// routes.post('/studentform', (request, response) => {
//     // console.log(request.body);
//     let fullname = request.body.fullname;
//     response.render('form.ejs', { nama:`Student Name : ${fullname}`})
// });


// routes.get('/teachers', function(request,response) {
//     response.render('teachers.ejs');
// });







module.exports = routes;
