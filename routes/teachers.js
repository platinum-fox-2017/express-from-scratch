const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Teacher.findAll({raw:true}).then(projects => {
        // projects will be an array of all Project instances
        // console.log(projects);
        let obj = {
            title: 'TEACHERS DATA SMDIA',
            arrTeachers: projects
        };
        response.render('teachers.ejs', obj);
    })

});

// TEST CONNECTION
// routes.get('/', function(request,response) {
//     response.send(`Daftar guru`)
// });


module.exports = routes;
