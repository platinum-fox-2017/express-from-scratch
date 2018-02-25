const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const Model = require('../models');
const Teachers = Model.Teachers;
//READ
router.get('/',(req,res,next) => {
    Teachers.findAll()
    .then((data_teachers) => {
        console.log(data_teachers);
        res.render('teachers', {
            data: data_teachers
        });
    });
});
//CREATE
router.get('/add',(req,res,next) => {
    res.render('form_add_teachers');
})
router.post('/add',(req,res,next) => {
    let new_teacher ={}
    new_teacher.first_name = req.body.first_name;
    new_teacher.last_name = req.body.last_name;
    new_teacher.email = req.body.email[0];
    new_teacher.subject = req.body.email[1];
    Teachers.create(new_teacher)
    .then(() => res.redirect('/teachers'));
})
//UPDATE
router.get('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    Teachers.findById(search_id)
    .then((data_teachers) => {
        res.render('form_edit_teachers',{
            data: data_teachers
        })
    })
})
router.post('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    let new_teacher ={}
    console.log(new_teacher.subject);
    new_teacher.first_name = req.body.first_name;
    new_teacher.last_name = req.body.last_name;
    new_teacher.email = req.body.email[0];
    new_teacher.subject = req.body.email[1];
    new_teacher.updatedAt = new Date();
    console.log(req.body.email);
    console.log(req.body.subject);
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