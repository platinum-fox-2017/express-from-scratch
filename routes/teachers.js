const routes    = require('express').Router();
const models    = require('../models');

routes.get('/', (req,res) => {
    models.Teacher.findAll(
        {
            order: [
                ['id','ASC']
            ],
            include : { model : models.Subject}
        })
    .then(teachers => {
        res.render('teachers-table', {teachers : teachers});
    })
    .catch(err=> {
        res.send(err);
    })
})

routes.get('/add', (req,res) => {
    models.Subject.findAll()
    .then(subjects => {
        res.render('teachers-form', {subjects : subjects});
    })
    .catch(err => {
        res.send(err);
    })
})

routes.post('/add',(req,res) => {
    models.Teacher.create({
        name: req.body.teacher_name,
        email : req.body.teacher_email,
        SubjectId : req.body.teacher_subject
    })
    .then(teachers => {
        res.redirect('/teachers');
    })
    .catch(err => {
        res.send(err);
    })
})

routes.get('/edit/:id',(req,res) => {
    models.Teacher.findOne({
        where : {id : req.params.id}
    })
    .then(teachersedit => {
        models.Subject.findAll()
        .then(subjectData => {
            res.render('teachers-edit-form', {teachersedit : teachersedit, subjectData : subjectData})
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.post('/edit/:id',(req,res) => {
    models.Teacher.update(
        {
            name: req.body.teacher_name,
            email: req.body.teacher_email,
            SubjectId: req.body.teacher_subject
        },
        {where : {id : req.params.id}})
    .then(success => {
        res.redirect('/teachers');
    })
    .catch(err=>{
        res.send(err)
    })
})

routes.get('/delete/:id',(req,res) => {
    models.Teacher.destroy({
        where : {id : req.params.id}
    })
    .then(() => {
        res.redirect('/teachers');
    })
    .catch(err => {
        res.send(err);
    })
})

module.exports = routes;