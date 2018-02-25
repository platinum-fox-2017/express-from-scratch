var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(request, response){
    model.Teacher.findAll({
        include:[{ model: model.Subject }]
    })
    .then(teachersData => {
        let obj = {
            title: 'Data Teacher',
            heading: 'All Teachers Data',
            data: teachersData
        }
        response.render('teacher.ejs', obj)
    })
})

router.get('/add' ,function(request, response){
    model.Subject.findAll().then(subjectData =>{
        let obj = {
            title: 'Form Teacher',
            formAction: '/teachers/add',
            formValue_id: '',
            formValue_f_name: '',
            formValue_l_name: '',
            formValue_email: '',
            formValue_subjectId: '',
            button: 'Save',
            data:subjectData
        }
        response.render('form-teacher.ejs', obj)
    })
})

router.post('/add', function(request, response) {
    model.Teacher.create({
        first_name: request.body.f_name,
        last_name: request.body.l_name,
        email: request.body.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        SubjectId: request.body.selectOpt,
    }).then(function()  {
      response.redirect('/teachers')
    })
})

router.get('/edit/:id', function(request, response){
    model.Teacher.findById(request.param('id'))
    .then(teachersData => {
        model.Subject.findAll().then(subjectData => {
            let obj = {
                title: 'Form Teacher',
                formAction: '/teachers/update',
                formValue_id: teachersData.id,
                formValue_f_name: teachersData.first_name,
                formValue_l_name: teachersData.last_name,
                formValue_email: teachersData.email,
                formValue_subjectId: teachersData.SubjectId,
                button: 'Update',
                data: subjectData,
            }
            response.render('form-teacher.ejs', obj)

        })
    })
})

router.post('/update', function(request, response){
    model.Teacher.update({
        first_name: request.body.f_name,
        last_name: request.body.l_name,
        email: request.body.email,
        SubjectId: request.body.selectOpt,
    }, { where: { id: request.body.id }
    }).then(function() {
        response.redirect('/teachers')
    })
})

router.get('/delete/:id', function(request, response){
    model.Teacher.destroy({
        where: {
          id: request.param('id'),
        }
    })
    .then(function(){
      response.redirect('/teachers')
    })
})


module.exports = router;

