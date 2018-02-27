const express = require('express')
const router = express.Router()

const Models = require('../models')


router.get('/', (req, res, next) => {
    Models.Teacher.findAll({
        include: [{model:Models.Subject,attributes :['name']}]
    }).then(data => {
        // console.log(JSON.parse(JSON.stringify(data)))
        Models.Subject.findAll().then(dataSubject => {
            res.render('./teacher-view/teacher', { data, dataSubject });
        })
    })
})

router.post('/add', (req, res, next) => {
    req.body.subjectId = Number(req.body.subjectId);
    Models.Teacher.create(req.body).then(data => {
        res.redirect('/teacher')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Teacher.findById(req.params.id).then(data => {
        Models.Subject.findAll().then(dataSubject => {
            res.render('./teacher-view/edit-teacher', { data, dataSubject })
        })
    })
})

router.post('/edit/:id', (req, res) => {
    req.body.subjectId = Number(req.body.subjectId);
    Models.Teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subjectId: req.body.subjectId,
        updatedAt: new Date()
    }, { where: { id: req.params.id } }).then(data => {
        res.redirect('/teacher')
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Teacher.destroy({ where: { id: req.params.id } }).then(data => {
        res.redirect('/teacher')
    })
})

module.exports = router