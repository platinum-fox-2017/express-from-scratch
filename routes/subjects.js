const routes    = require('express').Router();
const models    = require('../models');

routes.get('/', (req,res) => {
    models.Subject.findAll({
        order: [
            ['id','ASC']
        ],
        include : {model : models.Teacher}
    })
    .then(subjects => {
        res.render('subjects-table', {subjects : subjects});
        // res.send(subjects);
    })
    .catch(err=> {
        res.send(err);
    })
})

routes.get('/add', (req,res) => {
    res.render('subjects-form');
})

routes.post('/add',(req,res) => {
    models.Subject.create({
        name: req.body.subject_name,
    })
    .then(subjects => {
        res.redirect('/subjects');
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/edit/:id', (req,res) => {
    models.Subject.findOne(
        {where : {id : req.params.id}}
    )
    .then(subjectsedit => {
        res.render('subjects-edit-form', {subjectsedit : subjectsedit})
    })
    .catch(err => {
        res.send(err)
    })
})

routes.post('/edit/:id',(req,res) => {
    models.Subject.update(
        {
            name : req.body.subject_name
        }, 
        {where : {id : req.params.id}}
    )
    .then(success => {
        res.redirect('/subjects');
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/delete/:id',(req,res) => {
    models.Subject.destroy({
        where : {id : req.params.id}
    })
    .then(success => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

routes.get('/:id/enrolledstudents',(req,res) => {
    models.SubjectStudent.findAll({
        where : {SubjectId : req.params.id},
        attributes: ['id','score'],
        include : [{model : models.Subject}, {model : models.Student}]
    })
    .then(enrolledstudents=> {
        res.render('enrolled-students', {enrolledstudents : enrolledstudents})
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/:idstudentsubject/givescore',(req,res) => {
    models.SubjectStudent.findOne({
        where : {id : req.params.idstudentsubject},
        attributes: ['id','score'],
        include : [{model: models.Subject}, {model : models.Student}]
    })
    .then(subjectstudent => {
        res.render('give-score',{subjectstudent : subjectstudent});
    })
    .catch(err => {
        res.send(err);
    })
})

routes.post('/:idstudentsubject/givescore',(req,res) => {
    models.SubjectStudent.update(
        {
            score: req.body.score
        },
        {where : {id : req.params.idstudentsubject}}
    )
    .then(success => {
        res.redirect('/subjects');
    })
    .catch(err => {
        res.send(err);
    })
})
module.exports = routes;