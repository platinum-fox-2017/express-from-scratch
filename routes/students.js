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
    response.render('form.ejs', obj);
});





module.exports = routes;
