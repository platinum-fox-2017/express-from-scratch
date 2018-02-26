const express = require('express');
const router = express.Router();

const Model = require('../models');
const Teachers = Model.Teachers;
const Subjects = Model.Subjects;

//READ
router.get('/',(req,res,next) => {
    Teachers.findAll({
        include: Subjects
    })
    .then((data_teachers) => {
        res.render('teachers', {
            data: data_teachers
        });
    });
});
//CREATE
router.get('/add',(req,res,next) => {
    Subjects.findAll().then((data_subjects) => {
        // res.send(data_subjects);
        res.render('form_add_teachers',{
            data: data_subjects,
        });
    })
})
router.post('/add',(req,res,next) => {
    let new_teacher ={}
    new_teacher.first_name = req.body.first_name;
    new_teacher.last_name = req.body.last_name;
    new_teacher.email = req.body.email;
    new_teacher.subject = req.body.subject;
    Teachers.create(new_teacher)
    .then(() => res.redirect('/teachers'));
})
//UPDATE
router.get('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    Teachers.findById(search_id)
    .then((data_teachers)=> {
        Subjects.findAll()
        .then((data_subjects)=> {
            // res.send(data_subjects);
            res.render('form_edit_teachers', {
                data: data_teachers,
                subjects: data_subjects,
            })
        })
    })
})
router.post('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    let new_teacher ={}
    new_teacher.first_name = req.body.first_name;
    new_teacher.last_name = req.body.last_name;
    new_teacher.email = req.body.email;
    new_teacher.subject = req.body.subject;
    new_teacher.updatedAt = new Date();
    Teachers.update(new_teacher, {
        where: {
            id: search_id
        }
    })
    .then(() => res.redirect('/teachers'));
})
//DELETE
router.get('/delete/:id',(req,res,next) => {
    let delete_id = req.params.id;
    Teachers.destroy({
        where: {
            id: delete_id
        }
    })
    .then(() => res.redirect('/teachers'))
})

module.exports = router;