'use strict'

const student = require('express').Router();
const controller = require('../../server/controller')

//CREATE
student.post('/', (request, respond) => {  
    controller.addData(request.body, 'Student')
    respond.redirect('/student')
})

//READ
student.get('/', function (request, respond) {
    controller.readStudent(respond)
})

//UPDATE
student.get('/edit/:id', function (request, respond) {
    controller.editStudent(respond, request.params.id, 'Student');

})

student.post('/edit', function (request, respond) {
    controller.gantiData(respond, request.body, 'Student');
    // console.log(request.body);
    respond.redirect('/student/')
    // controller.readSubject(respond)
})

//DELETE
student.get('/delete/:id', function (request, respond) {
    controller.deleteData(request.params.id, 'Student');
    respond.redirect('/student')
})



module.exports = student