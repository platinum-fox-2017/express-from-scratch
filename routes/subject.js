'use strict'

const router = require('express').Router();
const models = require('../models');

router.get('/',(req,res) => {
    models.Subject.findAll({
        include: [
            {model: models.Teacher,
            order: [['first_name','ASC']]
        }],
        order:[['subject_name','ASC']]
    }).then(subjects => {
            res.render('./subjects/subjects',{subjects:subjects});
        });
});

router.get('/add', (req,res) => {
    res.render('./subjects/addSubject');
});

router.post('/add', (req,res) => {
    models.Subject.create({
        subject_name: req.body.subject_name,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(subjects => {
            res.redirect('/subjects');
        });
});

router.get('/edit/:id', (req, res) => {
    models.Subject.findById(req.params.id)
        .then(subject => {
            let tempObj = new Object();
            tempObj.id = subject.id;
            tempObj.subject_name = subject.subject_name;

            res.render('./subjects/editSubject',{tempObj: tempObj});
        });
});

router.post('/edit', (req, res) => {
    models.Subject.update({
        subject_name: req.body.subject_name,
    }, {
        where: {id : req.body.id}
    })
        .then(updates => {
            res.redirect('/subjects');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', (req,res) => {
    models.Subject.destroy({where: {SubjectId: req.params.id}})
        .then(()=>{
            res.redirect('/subjects');
        })
});

router.get('/:id/enrolledstudents', (req,res) => {
    models.SubjectStudent.findAll({
        attributes:['id','SubjectId','StudentId','Score'],
        where: {
            SubjectId:req.params.id
        },
        include: [
            {model:models.Subject},
            {model:models.Student}
        ],
        order: [[models.Student,'first_name','ASC']]
    }).then(subjectstudent => {
        models.Subject.findById(req.params.id)
            .then(subject => {
                // res.send(subjectstudent)
                res.render('./subjects/enrolledstudents', {subject: subject, subjectstudent:subjectstudent});
            })
    })
});

router.get('/:idSubjectStudent/givescore', (req,res) => {
    models.SubjectStudent.findOne({
        attributes:['id','SubjectId','StudentId','Score'],
        where: {
            id:req.params.idSubjectStudent
        },
        include: [
            {model:models.Subject},
            {model:models.Student}
        ]
    }).then(subjectstudent => {
        // res.send(subjectstudent)
        res.render('./subjects/givescore', {subjectstudent:subjectstudent});
    })
});

router.post('/:idSubjectStudent/givescore', (req,res) => {
    models.SubjectStudent.update({
        Score: req.body.Score,
    }, {
        where: {
            id : req.params.idSubjectStudent
        }
    })
        .then(updates => {
            res.redirect('/subjects/'+req.body.SubjectId+'/enrolledstudents');
        })
});


module.exports = router;
