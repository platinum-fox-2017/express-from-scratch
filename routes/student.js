const express = require('express');
const { Student, Subject, SubjectStudent } = require('../models')
const router = express.Router();

router.get('/', (req, res) => {
    Student.findAll()
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data));
        let err = null
        res.render('student', { dataStudent: convertData, err })
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/add', (req,res) => {
    res.render('student_add')
})

router.post('/add', (req,res) => {
    let studentAddObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    Student.create(studentAddObj)
    .then(data => {
        res.redirect('/student')
    })
    .catch(err => {
        res.render('student_add', { dataErr: err.errors[0].message })
    })
});

router.get('/add_subject/:id', (req, res) => {
    Student.findById(req.params.id)
    .then(data => {
        Subject.findAll()
        .then(dataSubs => {
            let convertData = JSON.parse(JSON.stringify(data));
            let convertSubject = JSON.parse(JSON.stringify(dataSubs));
            console.log(convertSubject)
            res.render('student_add_subject', { dataStudent: convertData, dataSubject: convertSubject })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/edit/:id', (req,res) => {
    Student.findById(req.params.id)
    .then(data => {
        console.log(data)
        res.render('student_edit', { data })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/edit/:id', (req,res) => {
    let studentEditObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
    Student.update(studentEditObj, {
        where: {id: req.params.id}
    })
    .then(data => {
         res.redirect('/student')
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/add_subject/:id', (req,res) => {
    let addSubjectStudent = {
        id_subject: req.body.id_subject,
        id_student: req.params.id,
    }
    SubjectStudent.create(addSubjectStudent)
    .then(data => {
        res.redirect('/student')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/delete/:id', (req,res) => {
    Student.destroy({
        where:{id: req.params.id}
    })
    .then(data => {
         res.redirect('/student')
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router