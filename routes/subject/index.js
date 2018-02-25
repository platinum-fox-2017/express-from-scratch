'use strict'

const subject = require('express').Router();
const controller = require('../../server/controller');

subject.get('/', function (request, respond) {
    // respond.send("menampilkan data teachers dengan menggunakan table html");
    // console.log("=====" + request.body)
    // controller.updateData(request.params.id, 'Subject');
    controller.readSubject(respond)
})

subject.get('/edit/:id', function (request, respond) {
    // respond.send("menampilkan data subjects dengan menggunakan table html");
    // console.log(request.params.id);
    // respond.render('editView.ejs')
    controller.updateData(respond, request.params.id, 'Subject');
    // respond.redirect('/subject')
})

subject.get('/delete/:id', function (request, respond) {
    // respond.send("menampilkan data subjects dengan menggunakan table html");
    // console.log(request.params.id);
    controller.deleteData(request.params.id, 'Subject');
    respond.redirect('/subject')
})

subject.post('/', (request, respond) => {  
    // console.log(request.body)
    controller.addData(request.body, 'Subject')
    respond.redirect('/subject')
})

module.exports = subject