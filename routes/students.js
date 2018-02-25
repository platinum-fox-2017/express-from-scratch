const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Student.findAll({raw:true}).then(projects => {
        let obj = {
            title: 'STUDENTS DATA SMDIA',
            arrStudents: projects
        };
        response.render('students.ejs', obj);
    })

});

routes.get('/add', (request, response) => {
    let obj = {
        title: 'Add Students Data'
    };
    response.render('students_form.ejs', obj);
});

routes.post('/add', (request, response) => {
    // console.log(request.body)
    var obj = request.body;
    models.Student.create({ first_name: obj.firstname, last_name: obj.lastname, email: obj.email })
        .then(() => models.Student.findOrCreate({where: {first_name: obj.firstname}, defaults: {}}))
        .spread((Student, created) => {
            console.log(Student.get({plain: true}))
            console.log(created)
        response.render('thanks.ejs');
    })
});


routes.get('/edit', (request, response) => {
    let obj = {
        title: 'Edit Students Data'
    };
    response.render('edit_students_form.ejs', obj);
});

routes.post('/edit', (request, response) => {
    // console.log(request.body)
    var obj = request.body;
    models.Student.update(obj, {where: {id: obj.ID}})
    .then(() => {
        console.log(obj);
        response.render('thanks.ejs');
    })
});

routes.get('/delete', (request, response) => {
    let obj = {
        title: 'Delete Students Data'
    };
    response.render('delete_students_form.ejs', obj);
});


routes.post('/delete', (request, response) => {
    var obj = request.body;
    models.Student.destroy({where: {id: obj.ID}})
        .then(() => {  
            console.log(`Successfully deleted ID ${obj.ID}`);
        })
    response.render('thanks.ejs');
});



module.exports = routes;
