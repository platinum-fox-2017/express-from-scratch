"use strict"

const express = require('express');
const model = require('../models');
const app = express();

const students = express.Router();

students.post('/', function(request, response){
});

students.get('/', (request, response) => {
    model.Student.findAll({order:[['firstName', 'ASC']]})
    .then(data => {response.render('students.ejs',{data:data});})
    .catch(err => {console.log(err);});
})

students.get('/add', (request, response) => {
    response.render('studentsAdd.ejs', {err:''})
});

students.post('/add', (request, response) => {
    console.log(request.body.email);
    model.Student.create(request.body)
    .then(() => {return model.Student.findAll({order:[['firstName', 'ASC']]})})
    .then((data) => response.render('students.ejs', {data:data}))
    .catch(err => { 
        // console.log(err.message);
        response.render('studentsAdd.ejs', {err: err.message})
    });
});

students.get('/edit/:id', (request, response) => {
    model.Student.findById(request.params.id)
    .then(data => {response.render('studentsEdit.ejs', {data:data})})
    .catch(err => console.log(err));
});

students.post('/edit/:id', (request, response) => {
    let changed = request.body;
    let id = request.params.id;
    model.Student.update(changed, {where: {id: id}})
    .then(() => {return model.Student.findAll({order:[['firstName', 'ASC']]})})
    .then((data) => response.render('students.ejs', {data:data}))
    .catch(err => console.log(err));
});

students.get('/delete/:id', (request, response) => {
    model.Student.destroy({where: {id: request.params.id}})
    .then(() => {return model.Student.findAll({order:[['firstName', 'ASC']]})})
    .then((data) => response.render('students.ejs', {data:data}))
    .catch(err => console.log(err));
});

students.get('/:id/addsubject', (request, response) => {
    let studentData;
    model.Student.findById(request.params.id)
    .then(data => {
        studentData = data;
        return model.Subject.findAll()
    })
    .then(data => {response.render('studentsAddSubject.ejs', {subjects:data, student:studentData})})
    .catch(err => console.log(err));
});

students.post('/:id/addsubject', (request, response) => {
    model.StudentsSubject.create({SubjectId:request.body.SubjectId, StudentId:request.params.id})
    .then(() => {return model.Student.findAll()})
    .then((data) => response.render('students.ejs', {data:data}))
    .catch(err => console.log(err));
})

module.exports = students;