const express = require('express');
const { Subject, Teacher, SubjectStudent, Student } = require('../models')
const router = express.Router();

router.get('/', (req,res) => { 
    Subject.findAll({include: Teacher})
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data))
        console.log(convertData[1].Teachers[4])
        res.render('subject', {data} )
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/add', (req,res) => {
    Subject.create({subject_name: req.body.subject_name})
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/edit/:id', (req,res) => {
    Subject.findById(req.params.id)
    .then(data => {
        console.log(data)
        res.render('subject_edit', { data })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/edit/:id', (req,res) => {
    Subject.update({subject_name: req.body.subject_name}, {
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/:id/enrolledstudent', (req,res) => {
    SubjectStudent.findAll({
        include: [Student, Subject],
        where: {id_subject: req.params.id}
    })
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data))
        
        res.render('subject_enroll', {dataSubjectStudent : convertData })
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/:idConj/:idStudent/give-score/:idSubject', (req,res) => {
    Student.findById(req.params.idStudent)
    .then(studentData => {
        Subject.findById(req.params.idSubject)
        .then(subjectData => {
            let studentObj = {
                id_conjuction: req.params.idConj,
                id_student: req.params.idStudent,
                id_subject: req.params.idSubject,
                subject_name: subjectData.subject_name,
                full_name: studentData.first_name + ' ' + studentData.last_name
            }
            res.render('subject_giveScore', {studentObj})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/:idConj/:idStudent/give-score/:idSubject', (req,res) => {
    SubjectStudent.update({ score: req.body.score }, {
        where: {
            id: req.params.idConj,
            id_subject: req.params.idSubject,
            id_student: req.params.idStudent
        }
    })
    .then(data => {
        res.redirect(`/subject/${req.params.idSubject}/enrolledstudent`)
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/delete/:id', (req,res) => {
    Subject.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router