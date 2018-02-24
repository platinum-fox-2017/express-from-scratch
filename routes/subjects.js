const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Subject.findAll({raw:true}).then(projects => {
        let obj = {
            title: 'SUBJECTS DATA SMDIA',
            arrSubjects: projects
        };
        response.render('subjects.ejs', obj);
    })

});

module.exports = routes;
