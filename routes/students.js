const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const Model = require('../models');
const Students = Model.Students;
//READ
router.get('/',(req,res,next) => {
    Students.findAll()
    .then((data_students) => {
        console.log(data_students);
        res.render('students', {
            data: data_students
        });
    });
});
//CREATE
router.get('/add',(req,res,next) => {
    res.render('form_add_students');
})
router.post('/add',(req,res,next) => {
    let new_student ={}
    new_student.first_name = req.body.first_name;
    new_student.last_name = req.body.last_name;
    new_student.email = req.body.email;
    Students.create(new_student)
    .then(() => res.redirect('/students'));
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

module.exports = router;