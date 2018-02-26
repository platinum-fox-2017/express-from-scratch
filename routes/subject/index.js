'use strict'

const subject = require('express').Router();
const controller = require('../../server/controller');

//CREATE
subject.post('/', (request, respond) => {  
    controller.addData(request.body, 'Subject')
    respond.redirect('/subject')
})

//READ
subject.get('/', function (request, respond) {
    controller.readSubject(respond)
})

//UPDATE
subject.get('/edit/:id', function (request, respond) {
    controller.editSubject(respond, request.params.id, 'Subject');

})

subject.post('/edit', function (request, respond) {
    controller.gantiData(respond, request.body, 'Subject');
    // console.log(request.body);
    respond.redirect('/subject/')
    // controller.readSubject(respond)
})

//DELETE
subject.get('/delete/:id', function (request, respond) {
    controller.deleteData(request.params.id, 'Subject');
    respond.redirect('/subject')
})

module.exports = subject