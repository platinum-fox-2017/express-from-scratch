'use strict'

const teacher = require('express').Router();
const controller = require('../../server/controller')

teacher.get('/', function (request, respond) {
    // respond.send("menampilkan data teachers dengan menggunakan table html");
    controller.readTeacher(respond)
})

teacher.get('/delete/:id', function (request, respond) {
    // respond.send("menampilkan data teachers dengan menggunakan table html");
    // console.log(request.params.id);
    controller.deleteData(request.params.id, 'Teacher');
    respond.redirect('/teacher')
})

teacher.post('/', (request, respond) => {  
    // console.log(request.body)
    controller.addData(request.body, 'Teacher')
    respond.redirect('/teacher')
})

module.exports = teacher