const express = require('express');
const router = express.Router();

const Model = require('../models');
const Students = Model.Students;
const Subjects = Model.Subjects;
const Subjects_Students = Model.Subjects_Students;
//READ
router.get('/',(req,res,next) => {
    Students.findAll()
    .then((data_students) => {
        res.render('students', {
            data: data_students
        });
    });
})
//CREATE
router.get('/add',(req,res,next) => {
    res.render('form_add_students',{err: null});
})
router.post('/add',(req,res,next) => {
    let new_student ={}
    new_student.first_name = req.body.first_name;
    new_student.last_name = req.body.last_name;
    new_student.email = req.body.email;
    Students.create(new_student)
    .then(() => res.redirect('/students/'))
    .catch((err) => {
        res.render('form_add_students', {
            err: err.errors[0].message
        });
    });
})
//UPDATE
router.get('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    Students.findById(search_id)
    .then((data_students) => {
        res.render('form_edit_students',{
            data: data_students
        })
    })
})
router.post('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    let new_student ={}
    new_student.first_name = req.body.first_name;
    new_student.last_name = req.body.last_name;
    new_student.email = req.body.email;
    new_student.updatedAt = new Date();
    Students.update(new_student, {
        where: {
            id: search_id
        }
    })
    .then(() => res.redirect('/students'));
})
//DELETE
router.get('/delete/:id',(req,res,next) => {
    let delete_id = req.params.id;
    Students.destroy({
        where: {
            id: delete_id
        }
    })
    .then(() => res.redirect('/students/'))
})
//ADD SUBJECT
router.get('/:id/addsubject',(req,res,next) => {
    let selected_id = req.params.id;
    Students.findById(selected_id)
    .then((data_student)=> {
        Subjects.findAll()
        .then((data_subjects) => {
            // res.send(data_subjects);
            res.render('form_add_subjects', {
                data: data_student,
                subjects: data_subjects,
            })
        })
    })
})

router.post('/:id/addsubject',(req,res,next) => {
    let subject_student = {}
    let new_student_id =req.params.id;
    let new_subject_id =req.body.subject;
    subject_student.student_id = new_student_id; 
    subject_student.subject_id = new_subject_id;
    console.log(req.body);
    Subjects_Students.create(subject_student)
    .then(()=> {
        res.redirect('/students');
    })
})

module.exports = router;
