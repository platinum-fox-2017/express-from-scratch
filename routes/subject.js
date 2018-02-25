var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(request, response){
    model.Subject.findAll({
        include: [{model: model.Teacher}]
    }).then(subjectData =>{
        let obj = {
            title: 'Data Subject',
            heading: 'All Subjects Data',
            data: subjectData,
            hrefCss: './css/style.css'
        }
        response.render('subject.ejs', obj)
    })
})

router.get('/add', function(request, response){
    let obj = {
        title: 'Form Subject',
        formAction: '/subjects/add',
        id: '',
        formValue_s_name: '',
        button: 'Save',
        hrefCss: '../css/style.css'
    }
    response.render('form-subject.ejs', obj)
})

router.post('/add', function(request, response){
    model.Subject.create({
        subject_name: request.body.s_name,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(function()  {
      response.redirect('/subjects')
    });
})

router.get('/edit/:id', function(request, response){
    model.Subject.findById(request.param('id')).then(subjectData => {
        let obj = {
            title: 'Form Subjects',
            formAction: '/subjects/update',
            id: subjectData.id,
            formValue_s_name: subjectData.subject_name,
            button: 'Update',
            hrefCss: '../../css/style.css'
        }
        response.render('form-subject.ejs', obj)
    })
})

router.post('/update', function(request, response){
    model.Subject.update({
        subject_name: request.body.s_name,
    }, { where: {id: request.body.id }
    }).then(function() {
        response.redirect('/subjects')
    })
})

router.get('/delete/:id', function(request, response){
    model.Subject.destroy({
        where: {
          id: request.param('id')
        }
    }).then(function() {
        response.redirect('/subjects')
    })
})


module.exports = router;