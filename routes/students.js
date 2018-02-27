'use strict'

// const confirm = require('confirm-dialog');
const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Student.findAll({
        order:[['first_name','ASC']]
    })
        .then(students => {
            res.render('./students/students', {students: students});
        });
});


router.get('/add', (req,res) => {
    res.render('./students/addStudent',{err:0});
    // res.render('./students/addStudent',{err:0});

});

router.post('/add', (req,res) => {
    models.Student.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(students => {
            res.redirect('/students');
        })
        .catch(err => {
            res.render('./students/addStudent',{err:err});
            // res.redirect('/students/add?='+err.message);
        })
});

router.get('/edit/:id', (req, res) => {
    models.Student.findById(req.params.id)
        .then(student => {
            let tempObj = new Object();
            tempObj.id = student.id;
            tempObj.first_name = student.first_name;
            tempObj.last_name = student.last_name;
            tempObj.email = student.email;

            res.render('./students/editStudent',{tempObj: tempObj});
        });
});

router.post('/edit', (req, res) => {
    models.Student.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    }, {
        where: {id : req.body.id}
    })
        .then(updates => {
            res.redirect('/students');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', (req,res) => {
    models.Student.destroy({where: {id: req.params.id}})
        .then(()=>{
            res.redirect('/students');
        })
});

router.get('/:id/addsubject', (req,res) => {
    models.Student.findById(req.params.id)
        .then(student => {
            models.Subject.findAll()
            .then(subject => {
                res.render('./students/addSubject',{student : student, subject: subject});
            })
        })
})

router.post('/:id/addsubject', (req,res) => {
    models.SubjectStudent.create({
        StudentId: req.params.id,
        SubjectId:req.body.SubjectId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    res.redirect('/students');
})

module.exports =router;
