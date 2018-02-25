var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(request, response){
    model.Student.findAll().then(studentsData =>{
        let obj = {
            title: 'Students Data',
            heading: 'Table Students',
            body: 'List Students',
            data: studentsData
        }
        response.render('student.ejs', obj);
    })
})

router.get('/add', function(request, response){
    let obj = {
        title: 'Form Student',
        heading: 'Form Students',
        formAction: '/students/add',
        id: '',
        formValue_fname: '',
        formValue_lname: '',
        formValue_email: '',
    }
    response.render('form-student.ejs', obj);
})

router.post('/add', function(request, response){
    model.Student.create({ 
        first_name: request.body.fname,
        last_name: request.body.lname,
        email: request.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(function() {
      response.redirect('/students')
    })
})

router.get('/edit/:id', function(request, response){
    model.Student.findById(request.param('id')).then(studentsData => {
        let obj = {
            title: 'Form Student',
            heading: 'Form Students',
            formAction: '/students/edit',
            id: studentsData.id,
            formValue_fname: studentsData.first_name,
            formValue_lname: studentsData.last_name,
            formValue_email: studentsData.email,
        }
        response.render('form-student.ejs', obj)
    })
})

router.post('/edit', function(request, response){
    model.Student.update({
        first_name: request.body.fname,
        last_name: request.body.lname,
        email: request.body.email,
    }, { where: { id: request.body.id }
    }).then(function(){
        response.redirect('/students')
    })
})

router.get('/#', function(request, response){
    response.send("hahahaha")
})

router.get('/delete/:id', function(request, response){
    model.Student.destroy({
        where: {
          id: request.param('id')
        }
    }).then(function(){
        response.redirect('/students')
    })
})




module.exports = router;