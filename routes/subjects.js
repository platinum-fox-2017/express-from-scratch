"use strict"
const model = require('../models');

const express = require('express');
const subjects = express.Router();


subjects.get('/', (request, response) => {
    model.Subject.findAll({raw:true})
    .then(data => {
        response.render('subjects.ejs',{data:data})
    })
});

module.exports = subjects;