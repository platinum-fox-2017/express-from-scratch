const express = require('express')
const router = express.Router()
const { Student, Subject, StudentSubject } = require('../models')

router.get('/', (req, res) => {
    Student.findAll().then((datas) => {
        res.render('student/students', { datas: datas })
    }).catch((err) => { console.log(err) })
})

router.get('/add', (req, res) => {
    res.render('student/student-add')
})

router.post('/add', (req, res) => {
    const body = req.body
    Student.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email
    }).then(() => {
        res.redirect('/students')
        console.log('ADDED Student Data')
    }).catch((err) => { console.log(err) })
})

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Student.findById(id).then((data) => {
        res.render('student/student-edit', { profile: data })
    }).catch((err) => { console.log(err) })
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Student.update({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email
    }, { where: { id: id } }).then(() => {
        res.redirect('/students')
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    Student.destroy({ where: { id: id } }).then(() => {
        res.redirect('/students')
    }).catch((err) => { console.log(err) })
})

router.get('/:id/addsubject', (req, res) => {
    const id = req.params.id
    Student.findById(id).then((student) => {
        Subject.findAll().then((subject) => {
            res.render('student/addsubject', { dataStudent: student, dataSubject: subject })
        })
    }).catch((err) => { console.log(err) })
})

router.post('/:id/addsubject', (req, res) => {
    const id = req.params.id
    const body = req.body
    StudentSubject.create({
        subjectId: body.subjectId,
        studentId: id
    }).then(() => {
        res.redirect('/students')
    }).catch((err) => { console.log(err) })
})


module.exports = router