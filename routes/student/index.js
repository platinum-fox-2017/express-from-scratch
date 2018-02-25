'use strict'

const student = require('express').Router();
const controller = require('../../server/controller')

student.get('/', function (request, respond) {
    // respond.send("menampilkan data teachers dengan menggunakan table html");
    controller.readStudent(respond)
})

student.get('/delete/:id', function (request, respond) {
    // respond.send("menampilkan data students dengan menggunakan table html");
    // console.log(request.params.id);
    controller.deleteData(request.params.id, 'Student');
    respond.redirect('/student')
})

student.post('/', (request, respond) => {  
    // console.log(request.body)
    controller.addData(request.body, 'Student')
    respond.redirect('/student')
})

module.exports = student