'use strict'

const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Teacher.findAll({
        include: [{model: models.Subject}],
        order:[['first_name','ASC']]
    })
        .then(teachers => {
            res.render('./teachers/teachers',{teachers: teachers});
        });
});


router.get('/add', (req,res) => {
    models.Subject.findAll()
        .then(subject => {
            res.render('./teachers/addTeacher',{subject: subject});
        })
});

router.post('/add', (req,res) => {
    models.Teacher.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        SubjectId: req.body.SubjectId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(teachers => {
            res.redirect('/teachers');
        });
});

router.get('/edit/:id', (req, res) => {
    models.Teacher.findById(req.params.id)
        .then(teacher => {
            models.Subject.findAll()
            .then(subject => {
                let tempObj = new Object();
                tempObj.id = teacher.id;
                tempObj.first_name = teacher.first_name;
                tempObj.last_name = teacher.last_name;
                tempObj.email = teacher.email;
                tempObj.SubjectId = teacher.SubjectId;
                tempObj.subject = subject;

                res.render('./teachers/editTeacher',{tempObj: tempObj});
            });
        });
});

router.post('/edit', (req, res) => {
    models.Teacher.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        SubjectId: req.body.SubjectId
    }, {
        where: {id : req.body.id}
    })
        .then(updates => {
            res.redirect('/teachers');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', (req,res) => {
    models.Teacher.destroy({where: {id: req.params.id}})
        .then(()=>{
            res.redirect('/teachers');
        })
});


module.exports = router;
