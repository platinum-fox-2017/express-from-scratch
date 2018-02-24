"use strict"
const model = require('../models');

const express = require('express');
const teachers = express.Router();

teachers.post('/', function(request, response){
});

teachers.get('/', (req, res) => {
    model.Teacher.findAll({raw:true})
    .then(data => {
        res.render('teachers.ejs', {data:data});
    })
    .catch(err => console.log(err));
})

module.exports = teachers;