'use strict'

const teacher = require('express').Router();
const controller = require('../../server/controller')

//CREATE
teacher.post('/', (request, respond) => {  
    controller.addData(request.body, 'Teacher')
    respond.redirect('/teacher')
})

//UPDATE
teacher.get('/edit/:id', function (request, respond) {
    controller.editTeacher(respond, request.params.id, 'Teacher');

})

teacher.post('/edit', function (request, respond) {
    controller.gantiData(respond, request.body, 'Teacher');
    // console.log(request.body);
    respond.redirect('/teacher/')
    // controller.readSubject(respond)
})

//READ
teacher.get('/', function (request, respond) {
    controller.readTeacher(respond)
})

//DELETE
teacher.get('/delete/:id', function (request, respond) {
    controller.deleteData(request.params.id, 'Teacher');
    respond.redirect('/teacher')
})

module.exports = teacher