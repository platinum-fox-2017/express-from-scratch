const express = require('express')
const router = express.Router()

const Models = require('../models')


router.get('/', (req, res, next) => {
    Models.Student.findAll().then(data => {
        res.render('./student-view/student', {data});
    })
})

router.post('/add', (req, res, next) => {
    Models.Student.create(req.body).then(data => {
        res.redirect('/student')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Student.findById(req.params.id).then(data => {
        res.render('./student-view/edit-student', { data })
    })
})

router.post('/edit/:id', (req, res) => {
    Models.Student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        updatedAt: new Date()
    }, {where: {id:req.params.id}}).then(data => {
        res.redirect('/student')
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Student.destroy({where: {id:req.params.id}}).then(data => {
        res.redirect('/student')
    })
})

router.get('/addSubject/:id', (req, res) => {
    let studentId = Number(req.params.id)
    Models.Student.findById(studentId).then(data => {
        Models.Subject.findAll().then(subject => {
            res.render('./student-view/add-subject', {data , subject})
        })
    })
})

router.post('/addSubject/:id', (req, res) => {
    let obj = {
        studentId: Number(req.params.id),
        subjectId: Number(req.body.subjectId)
    }
    Models.subject_student.create(obj).then(data => {
        res.redirect('/student')
    })
})

module.exports = router