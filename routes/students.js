"use strict"

const data = require('../data.json');
const express = require('express');
const model = require('../models');
const app = express();
// const bodyParser = require('body-parser');

const students = express.Router();

// students.use(bodyParser.json());

students.post('/', function(request, response){
});

students.get('/', (request, response) => {
    model.Student.findAll({raw:true})
    .then(data => {
        response.render('students.ejs',{data:data});
    });
})

students.get('/add', (request, response) => {
    response.render('studentsAdd.ejs')
});

students.post('/add', (request, response) => {
    console.log(request.body.email);
    model.Student.create(request.body);
    response.render('studentsAdd.ejs');
});

students.get('/edit/:id', (request, response) => {
    model.Student.findById(request.params.id)
    .then(data => {
        response.render('studentsEdit.ejs', {data:data})
    })
});

students.post('/edit/:id', (request, response) => {
    let changed = request.body;
    let id = request.params.id;
    model.Student.update(changed, {where: {id: id}})
    .then(() => response.render('index.ejs'))
});

students.get('/delete/:id', (request, response) => {
    // console.log(request.params.id)
    model.Student.destroy({where: {id: request.params.id}})
    .then(() => response.render('index.ejs'))
});

module.exports = students;