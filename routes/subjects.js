const express = require('express');
const router = express.Router();

const Model = require('../models');
const Subjects = Model.Subjects;
const Teachers = Model.Teachers;
const Students = Model.Students;
const Subjects_Students = Model.Subjects_Students;

//READ
router.get('/',(req,res,next) => {
    Subjects.findAll({
        include: Teachers
    })
    .then((data_subjects) => {
        res.render('subjects', {
            data: data_subjects
        });
    });
});
//READ SPECIFIC SUBJECT
router.get('/:id/enrolledstudents',(req,res,next) => {
    let search_id = req.params.id;
    Subjects.findById(search_id, {
        include: Students,
    })
    .then((data_subject) => {
        // res.send(data_subject);
        res.render('specific_subject', {
            data: data_subject,
        })
    })
});
//GIVE SCORE
router.get('/:id/givescore/:id2',(req,res,next) => {
    let searched_student_id =req.params.id;
    let searched_subject_id =req.params.id2;
    let arrPromise = [
        Students.findById(searched_student_id),
        Subjects.findById(searched_subject_id)
    ];
    Promise.all(arrPromise).then((data) => {
        // res.send(data)
        res.render('give_score', {
            student:data[0],
            subject:data[1],
        })
    })
})

router.post('/:id/givescore/:id2',(req,res,next) => {
    let searched_student_id =req.params.id;
    let searched_subject_id =req.params.id2;
    let object ={}
    object.score = req.body.score;
    Subjects_Students.update(object, {
        where : {
            student_id: searched_student_id,
            subject_id: searched_subject_id,
        }
    })
    .then(() => {
        res.redirect('/subjects');
    })
});

module.exports = router;