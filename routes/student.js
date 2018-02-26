const express = require('express')
const router = express.Router()
const { Student, Subject, StudentSubject } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
router.get('/', (req, res) => {
    Student.findAll({
        order: [
            ['first_name', 'ASC']
        ]
    }).then((datas) => {
        for (let index = 0; index < datas.length; index++) {
            datas[index].fullname = datas[index].getFullName()
        }
        res.render('student/students', { datas: datas })
    }).catch((err) => { console.log(err) })
})

router.get('/add', (req, res) => {
    let err = ''
    res.render('student/student-add', { err })
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
    }).catch((err) => {
        // res.send(err.errors[0].message)
        res.render('student/student-add', { err })
    })
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