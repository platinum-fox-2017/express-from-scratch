const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Teacher.findAll({
        include: [{
            model: models.Subject
        }]
    }).then(projects => {
        // projects will be an array of all Project instances
        // console.log(projects);
        let obj = {
            title: 'TEACHERS DATA SMDIA',
            arrTeachers: projects
        };
        // response.send(projects);
        response.render('teachers.ejs', obj);
    })

    //ASSOCIATION TEST
    //  models.Teacher.findAll({
    //      include: [{
    //          model: models.Subject
    //      }]
    //  }).then(arrObjTeachers => {
    //     response.send(arrObjTeachers);
    // })
});

routes.get('/add', (request, response) => {
    let obj = {
        title: 'Add Teachers Data'
    };
    response.render('teachers_form.ejs', obj);
});

routes.post('/add', (request, response) => {
    // console.log(request.body)
    var obj = request.body;
    models.Teacher.create({ first_name: obj.first_name, last_name: obj.last_name, email: obj.email, SubjectId: obj.SubjectId })
        .then(() => models.Teacher.findOrCreate({where: {first_name: obj.first_name}, defaults: {}}))
        .spread((Teacher, created) => {
            console.log(Teacher.get({plain: true}))
            console.log(created)
        response.redirect('/teachers');
    })
});

routes.get('/edit/:id', (request, response) => {
    // let id = request.params.id
    // response.send({nomor: id});
    let obj = {
        title: 'Edit Teachers Data'
    };
    response.render('edit_teachers_form.ejs', obj);
});

routes.post('/edit/:id', (request, response) => {
    let id = request.params.id
    // response.send({nomor: id});
    // console.log(request.body)
    var obj = request.body;
    models.Teacher.update(obj, {where: {id: id}})
    .then(() => {
        console.log(obj);
        response.redirect('/teachers');
    })
});

routes.get('/delete/:id', (request, response) => {
    let id = request.params.id
    models.Teacher.destroy({where: {id: id}})
        .then(() => {  
            console.log(`Successfully deleted ID ${id}`);
        })
    response.render('thanks.ejs');
});








// TEST CONNECTION
// routes.get('/', function(request,response) {
//     response.send(`Daftar guru`)
// });


module.exports = routes;
