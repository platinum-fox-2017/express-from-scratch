const express = require('express')
const router = express.Router()
const { Subject, Teacher, StudentSubject, Student } = require('../models')

router.get('/', function (req, res) {
    Subject.findAll({
        include: [
            { model: Teacher }
        ]
    }).then((datas) => {
        // res.send(datas)
        res.render('subject/subject', { datas: datas })
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/add', (req, res) => {
    res.render('subject/subject-add')
})

router.post('/add', (req, res) => {
    const body = req.body
    Subject.create({
        subject_name: body.subject_name
    }).then(() => {
        res.redirect('/subjects')
    }).catch((err) => { console.log(err) })
})

router.get('/:id/enrolledstudents', (req, res) => {
    const id = req.params.id
    StudentSubject.findAll(
        {
            where: { subjectId: id },
            include: [
                Student, Subject
            ]
        }
    ).then((data) => {
        // res.send(data)
        res.render('subject/enrolledstudent', { data: data })
    }).catch((err) => { console.log(err) })
})

router.get('/:id/:studentId/give-score', (req, res) => {
    const id = req.params.id
    const studentId = req.params.studentId
    StudentSubject.findOne(
        {
            where: { subjectId: id, studentId: studentId },
            include: [
                Student, Subject
            ]
        }
    ).then((data) => {
        // res.send(data)
        res.render('subject/score', { data: data })
    }).catch((err) => { console.log(err) })
})

router.post('/:id/:studentId/give-score', (req, res) => {
    const id = req.params.id
    const studentId = req.params.studentId
    const body = req.body
    StudentSubject.update({
        score: body.score
    }, {
            where: { subjectId: id, studentId: studentId }
        }).then((data) => {
            // res.send()
            res.redirect(`/subjects/${req.params.id}/enrolledstudents`)
        }).catch((err) => { console.log(err) })
})

module.exports = router