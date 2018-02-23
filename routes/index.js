// const express = require('express');
const routes = require('express').Router();


routes.get('/', function(request,response) {
    response.send(`SEKOLAH MENENGAH ATAS KEJURUAN HACKER PONDOK INDAH
    Hello User, Selamat datang di halaman web sekolah hacking terbaik di Jakarta !`)
})

routes.get('/student', function(request,response) {
    response.render('form.ejs');
});

routes.post('/studentform', (request, response) => {
    // console.log(request.body);
    let fullname = request.body.fullname;
    response.render('form.ejs', { nama:`Student Name : ${fullname}`})
});


routes.get('/teachers', function(request,response) {
    response.render('teachers.ejs');
});







module.exports = routes;
