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

module.exports = router