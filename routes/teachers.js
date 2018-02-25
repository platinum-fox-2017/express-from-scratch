"use strict"
const model = require('../models');

const express = require('express');
const teachers = express.Router();

teachers.post('/', function(request, response){
});

teachers.get('/', (request, response) => {
    model.Teacher.findAll({include:[{model: model.Subject}],order:[['firstName', 'ASC']],raw:true})
    .then(data => {response.render('teachers.ejs', {data:data})})
    .catch(err => console.log(err));
})

teachers.get('/add', (request, response) => {
    model.Subject.findAll({raw:true})
    .then(data => response.render('teachersAdd.ejs', {subject:data}))
    .catch(err => console.log(err))
})

teachers.post('/add', (request, response) => {
    console.log(request.body)
    model.Teacher.create(request.body)
    .then(() => {return model.Teacher.findAll({include:[{model: model.Subject}],order:[['firstName', 'ASC']],raw:true})})
    .then((data) => response.render('teachers.ejs', {data:data}))
    .catch(err => console.log(err));
})

teachers.get('/edit/:id', (request, response) => {
    let teachersData;
    model.Teacher.findById(request.params.id)
    .then(data => {
        teachersData=data;
        return model.Subject.findAll({raw:true});
    })
    .then(data => {response.render('teachersEdit.ejs', {teacher:teachersData, subject:data});})
    .catch(err => console.log(err));
})

teachers.post('/edit/:id', (request, response) => {
    model.Teacher.update(request.body, {where:{id: request.params.id}})
    .then(() => {return model.Teacher.findAll({include:[{model: model.Subject}],order:[['firstName', 'ASC']],raw:true})})
    .then(data => {response.render('teachers.ejs', {data:data})})
    .catch(err => console.log(err));
});

teachers.get('/delete/:id', (request, response) => {
    model.Teacher.destroy({where: {id: request.params.id}})
    .then(() => {return model.Teacher.findAll({include:[{model: model.Subject}],raw:true})})
    .then((data) => response.render('teachers.ejs', {data:data}))
    .catch(err => console.log(err));
})

module.exports = teachers;