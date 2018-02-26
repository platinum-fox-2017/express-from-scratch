const express = require('express');
const { Teacher, Subject } = require('../models');

const router = express.Router();

router.get('/', (req,res) => {
    Teacher.findAll({
        attributes: ['Subject.subject_name','first_name', 'last_name', 'email','id'],
        include: Subject
    })
    .then(data => {
        Subject.findAll()
        .then(getSubject => {
            let convertData = JSON.parse(JSON.stringify(data));
            console.log(convertData.Subject)
            res.render('teacher', { dataTeacher: convertData, dataSubject: getSubject })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/add', (req,res) => {
    let teacherAddObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        id_subject: req.body.id_subject
    }
    Teacher.create(teacherAddObj)
    .then(createSuccess => {
        res.redirect('/teacher')
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/edit/:id', (req,res) => {
    Teacher.findAll({
        attributes: ['Subject.subject_name', 'first_name', 'last_name', 'email', 'id'],
        include: Subject,
        where: {id:req.params.id}
    })
    .then(data => {
        Subject.findAll()
        .then(getSubject => {
            let convertData = JSON.parse(JSON.stringify(data));
            res.render('teacher-edit', { dataTeacher: convertData[0], dataSubject: getSubject })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/edit/:id', (req,res) => {
    let teacherEditObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        id_subject: req.body.id_subject
    }
    Teacher.update(teacherEditObj, {
        where: {id: req.params.id}
    })
    .then(data => {
         res.redirect('/teacher')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/delete/:id', (req,res) => {
    Teacher.destroy({
        where:{id: req.params.id}
    })
    .then(data => {
         res.redirect('/teacher')
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router