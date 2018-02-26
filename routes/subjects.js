const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Subject.findAll({
        include: [{
            model: models.Teacher
        }]
    }).then(projects => {
        let obj = {
            title: 'SUBJECTS DATA SMDIA',
            arrSubjects: projects
        };
        // response.send(projects);
        response.render('subjects.ejs', obj);
    })

    //ASSOCIATION TEST
    // models.Subject.findAll({
    //     include: [{
    //         model: models.Teacher
    //     }]
    // }).then(arrObjSubjects => {
    //     response.send(arrObjSubjects);
    // })
});


routes.get('/:id/enrolledstudents', (request, response) => {
    let id = request.params.id // id subjects

    models.StudentSubject.findAll({
        include: [{
            model: models.Student
        }],
        where: {
            SubjectId: id
        }}).then(projects => {
        // response.send(projects); // array of objects of subjects and students
        models.Subject.findById(id).then(objSubject => {
            // response.send(objSubject); // object of subjectsid
            let obj = {
                title: objSubject.subject_name,
                arrStudents: projects
            };
            response.render('enrolled_students.ejs', obj);
        });
    })
});


routes.get('/:id/enrolledstudents/:id1/givescore', (request, response) => {
    let id = request.params.id // id subjects
    let id1 = request.params.id1 // id students

    models.StudentSubject.findAll({
        include: [{
                model: models.Student
            }, {
                model: models.Subject
            }
        ],
        where: {
            SubjectId: id,
            StudentId: id1
        }}).then(project => {
            let obj = {
                title: 'ADD SCORES TO STUDENT PER SUBJECT',
                arrObjScore: project
            };
        // response.send(project); // array of objects of subjects and students
        response.render('add_score.ejs', obj);

    })
});

routes.post('/:id/enrolledstudents/:id1/givescore', (request, response) => {
    let id = request.params.id // id subjects
    let id1 = request.params.id1 // id students

    var obj = request.body;
    // response.send(obj);
    models.StudentSubject.update(obj, {where: {SubjectId: id, StudentId: id1}})
    .then(() => {
        response.redirect(`/subjects/${id}/enrolledstudents`);
    })
});







module.exports = routes;
