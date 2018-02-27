const express = require('express')
const router = express.Router()

const Models = require('../models')
const scoringHelper = require('../views/helper/scoring-desc')
const Op = require('sequelize').Op


router.get('/', (req, res, next) => {
    Models.Subject.findAll({
        include: [{ model: Models.Teacher, attributes: ['firstName','lastName'] }]
    }).then(data => {
        Models.Teacher.findAll().then(dataTeacher => {
            res.render('./subject-view/subject', { data, dataTeacher });
        })
    })
})

router.post('/add', (req, res, next) => {
    Models.Subject.create(req.body).then(data => {
        res.redirect('/subject')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Subject.findById(req.params.id).then(data => {
        res.render('./subject-view/edit-subject', { data })
    })
})

router.post('/edit/:id', (req, res) => {
    Models.Subject.update({
        name: req.body.name,
        updatedAt: new Date()
    }, { where: { id: req.params.id } }).then(data => {
        res.redirect('/subject')
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Subject.destroy({ where: { id: req.params.id } }).then(data => {
        res.redirect('/subject')
    })
})

//view enrolled student
router.get('/enroll/:id', (req, res) => {
    let subjectId = Number(req.params.id)
    Models.subject_student.findAll({ where: { subjectId:subjectId }
        , include: [Models.Student]
        , attributes: ['id','score']
    }).then(data => {
        
        res.render('./subject-view/enroll-student', {data, scoringHelper,subjectId: subjectId})
    })
})

//give score

router.get('/enroll/:id/:subjectId/:studentId', (req, res) => {
    
    let studentIdData = Number(req.params.studentId)
    let subjectIdData = Number(req.params.subjectId)
    console.log(subjectIdData)
    Models.subject_student.findAll({
        include: [Models.Subject, Models.Student],
        attributes: ['id'],
        where: {
            id: subjectIdData
        }
    }).then(data => {
        
        res.render('subject-view/assign-score', {data,subjectId: Number(req.params.subjectId)})
    })
})

router.post('/enroll/:id/:subjectId/:studentId', (req, res) => {
    let studentIdData = Number(req.params.studentId)
    let subjectIdData = Number(req.params.subjectId)
    let score = { score: Number(req.body.score) }
    Models.subject_student.update(score, {
        where: {
            studentId: studentIdData,
            subjectId: subjectIdData
        }
    }).then(result => {
        res.redirect(`/subject/enroll/${subjectIdData}`)
    })
})



module.exports = router