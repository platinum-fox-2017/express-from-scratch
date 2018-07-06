const express = require('express')
const router = express.Router()
const { Teacher, Subject } = require('../models')

router.get('/', function (req, res) {
    Teacher.findAll(
        {
            include: [
                { model: Subject }
            ],
            order: [
                ['first_name', 'ASC']
            ]
        }).then((datas) => {
            // res.send(datas)
            res.render('teacher/teachers', { datas: datas })
        }).catch((err) => {
            console.log(err)
        })
})

router.get('/add', (req, res) => {
    Subject.findAll().then((subject) => {
        // res.send(subject)
        res.render('teacher/teacher-add', { data: subject })
    }).catch((err) => { console.log(err) })
})

router.post('/add', (req, res) => {
    const body = req.body
    // res.send(body)
    Teacher.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        subjectId: body.subjectId
    }).then(() => {
        res.redirect('/teachers')
    }).catch((err) => { console.log(err) })
})

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Teacher.findById(id, {
        include: [
            {
                model: Subject
            }
        ]
    }).then((data) => {
        Subject.findAll().then((subject) => {
            res.render('teacher/teacher-edit', { dataTeacher: data, dataSubject: subject })
        })
    }).catch((err) => { console.log(err) })
})

router.post('/edit/:id', (req, res) => {
    const body = req.body
    const id = req.params.id
    // res.send(body)
    Teacher.update({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        subjectId: body.subjectId
    }, {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/teachers')
        }).catch((err) => { console.log(err) })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    Teacher.destroy({
        where:
            { id: id }
    }).then(() => {
        res.redirect('/teachers')
    }).catch((err) => { console.log(err) })
})

module.exports = router