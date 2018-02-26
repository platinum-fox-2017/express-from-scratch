const express = require('express');
const routes = express.Router();
const models = require('../models');

routes.get('/', (request, response) => {
    models.Student.findAll({raw:true}).then(projects => {
        let obj = {
            title: 'STUDENTS DATA SMDIA',
            arrStudents: projects
        };
        response.render('students.ejs', obj);
    })

});

routes.get('/add', (request, response) => {
    let obj = {
        title: 'Add Students Data'
    };
    response.render('students_form.ejs', obj);
});

routes.post('/add', (request, response) => {
    // console.log(request.body)
    var obj = request.body;
    models.Student.create({ first_name: obj.firstname, last_name: obj.lastname, email: obj.email })
        .then(() => models.Student.findOrCreate({where: {first_name: obj.firstname}, defaults: {}}))
        .spread((Student, created) => {
            console.log(Student.get({plain: true}))
            console.log(created)
        response.redirect('/students');
    })
});


routes.get('/edit/:id', (request, response) => {
    // let id = request.params.id
    // response.send({nomor: id});
    let obj = {
        title: 'Edit Students Data'
    };
    response.render('edit_students_form.ejs', obj);
});

routes.post('/edit/:id', (request, response) => {
    let id = request.params.id
    // response.send({nomor: id});
    // console.log(request.body)
    var obj = request.body;
    models.Student.update(obj, {where: {id: id}})
    .then(() => {
        console.log(obj);
        response.redirect('/students');
    })
});

routes.get('/delete/:id', (request, response) => {
    // let obj = {
    //     title: 'Delete Students Data'
    // };
    // response.render('delete_students_form.ejs', obj); // USING FORM
    let id = request.params.id
    models.Student.destroy({where: {id: id}})
        .then(() => {  
            console.log(`Successfully deleted ID ${id}`);
        })
    response.render('thanks.ejs');
});

routes.get('/:id/addsubject', (request, response) => {
    let id = request.params.id
    models.Student.findById(id).then(objStudent => {
        // response.send(objStudent);
        let obj = {
            title: 'ADD SUBJECT TO STUDENT',
            arrStudent: objStudent
        };
        response.render('edit_studentsubjects_form.ejs', obj);
    });
});


routes.post('/:id/addsubject', (request, response) => {
    // response.send(request.body);
    let id = request.params.id
    let getObjSubjects = request.body;
    
    let newObj = {}
    newObj['StudentId'] = id;
    newObj['SubjectId'] = getObjSubjects.arrSubjectsId; // array of string of subjects Id

    for (let i = 0; i < newObj.SubjectId.length; i++) {
        models.StudentSubject.create({ StudentId: newObj.StudentId, SubjectId: newObj.SubjectId[i] })
        .then(() => models.StudentSubject.findOrCreate({where: {StudentId: newObj.StudentId}, defaults: {}}))
        .spread((StudentSubject, created) => {
            console.log(StudentSubject.get({plain: true}))
            // console.log(created)
            response.redirect('/students');
        })
    }

});






// DELETE USING FORM
// routes.post('/delete/:id', (request, response) => {
//     var obj = request.body;
//     models.Student.destroy({where: {id: obj.ID}})
//         .then(() => {  
//             console.log(`Successfully deleted ID ${obj.ID}`);
//         })
//     response.render('thanks.ejs');
// });



module.exports = routes;
