"use strict"
const model = require('../models');

const express = require('express');
const subjects = express.Router();


subjects.get('/', (request, response) => {
    model.Subject.findAll({include: [{model: model.Teacher}],order:[['id']],raw:true})
    .then(data => {response.render('subjects.ejs',{data:data})})
    .catch(err => console.log(err))
});

subjects.get('/add', (request, response) => {
    response.render('subjectsAdd.ejs');    
});

subjects.post('/add', (request, response) => {
    model.Subject.create(request.body)
    .then(() => {return model.Subject.findAll({include: [{model: model.Teacher}],order:[['id']],raw:true})})
    .then(data => {response.render('subjects.ejs',{data:data})})
    .catch(err => console.log(err))
});

subjects.get('/:id/enrolledstudents', (request, response) => {
    model.Student.findAll({
        include: [{
            model: model.Subject,
            where: {id: request.params.id}
        }],
        order:[['firstName', 'ASC']],
        raw:true})
    .then(data => {response.render('subjectsEnrolledStudents.ejs', {data:data})})
    .catch(err => console.log(err));
});

subjects.get('/:SubjectId/:StudentId/givescore', (request, response) => {
    model.Student.findAll({
        include: [{
            model: model.Subject,
            where: {id: request.params.SubjectId}
        }],
        where: {id: request.params.StudentId},
        raw:true})
    .then(data => {response.render('studentsGiveScore.ejs', {data:data[0]})})
    .catch(err => console.log(err));
});

subjects.post('/:SubjectId/:StudentId/givescore', (request, response) => {
    console.log(request.body);
    model.StudentsSubject.update(request.body, {where:{StudentId: request.params.StudentId, SubjectId: request.params.SubjectId}})
    .then(() => {return model.Student.findAll({
        include: [{
            model: model.Subject,
            where: {id: request.params.SubjectId}
        }],
        raw:true})})
    .then(data => {response.render('subjectsEnrolledStudents.ejs', {data:data})})
    .catch(err => console.log(err));
})

module.exports = subjects;