const express = require('express');
const { Teacher, Subject } = require('../models');

const router = express.Router();

router.get('/', (req,res) => {
    Teacher.findAll({
        attributes: ['Subject.subject_name','first_name', 'last_name'],
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
         Teacher.findAll()
        .then(data => {
            Subject.findAll()
            .then(getSubject => {
                res.render('teacher', { dataTeacher: data, dataSubject: getSubject })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router