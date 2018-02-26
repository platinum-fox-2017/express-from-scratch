const routes = require('express').Router();
const models = require('../models');

routes.get('/', (req,res) => {
    models.Student.findAll({
        order: [
                ['id','ASC']
            ]
    })
    .then(students => {
        res.render('students-table', {students : students});
    })
    .catch(err=> {
        res.send(err);
    })
})

routes.get('/add', (req,res) => {
    res.render('students-form');
})

routes.post('/add',(req,res) => {
    models.Student.create({
        name: req.body.student_name,
        email : req.body.student_email
    })
    .then(students => {
        res.redirect('/students');
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/edit/:id',(req,res) => {
    models.Student.findOne({
        where : {id : req.params.id}
    })
    .then(studentsedit => {
        res.render('students-edit-form', {studentsedit : studentsedit})
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.post('/edit/:id',(req,res) => {
    models.Student.update(
        {
            name: req.body.student_name,
            email: req.body.student_email
        },
        {where : {id : req.params.id}})
    .then(success => {
        res.redirect('/students');
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.get('/delete/:id',(req,res) => {
    models.Student.destroy({
        where : {id : req.params.id}
    })
    .then(() => {
        res.redirect('/students');
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/:id/addsubject',(req,res) => {
    models.Student.findOne({
        where : { id : req.params.id}
    })
    .then(students => {
        models.Subject.findAll()
        .then(subjects => {
            res.render('students-add-subject', {students : students, subjects : subjects});
        })
    })
    .catch(err => {
        res.send(err);
    })
})

routes.post('/:id/addsubject',(req,res) => {
    models.SubjectStudent.create({
        StudentId : req.params.id,
        SubjectId : req.body.student_subject
    })
    .then(success=>{
        res.redirect('/students');
    })
    .catch(err => {
        res.send(err);
    })
})

module.exports = routes;