var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/', function(request, response){
    model.Teacher.findAll()
    .then(teachersData =>{
        let obj = {
            title: 'Teachers Data',
            heading: 'Table Teachers',
            body: 'Ini adalah daftar guru-guru yang aktif',
            data: teachersData
        }
        response.render('teacher.ejs', obj)
    })
})
router.get('/add' ,function(request, response){
    let obj = {
        formAction: '/teachers/add',
        formValue_id: '',
        formValue_f_name: '',
        formValue_l_name: '',
        formValue_email: '',
    }
    response.render('form-teacher.ejs', obj);
})

router.post('/add', function(request, response) {
    model.Teacher.create({
        first_name: request.body.f_name,
        last_name: request.body.l_name,
        email: request.body.email,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(function()  {
      response.redirect('/teachers')
    });
});

router.get('/edit/:id', function(request, response){
    model.Teacher.findById(request.param('id'))
    .then(teachersData => {
        let obj = {
            formAction: '/teachers/update',
            formValue_id: teachersData.id,
            formValue_f_name: teachersData.first_name,
            formValue_l_name: teachersData.last_name,
            formValue_email: teachersData.email,
        }
        response.render('form-teacher.ejs', obj)
    })
})

router.post('/update', function(request, response){
    model.Teacher.update({
        first_name: request.body.f_name,
        last_name: request.body.l_name,
        email: request.body.email,
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

