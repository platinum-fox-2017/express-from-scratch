var express = require('express');
var router = express.Router();
// var model = require('../models/index');
var routersTeacher = require('./teacher.js');
var routersStudent = require('./student.js');
var routersSubject = require('./subject.js');

router.get('/', function(request, response){
    let obj = {
        title: 'Home',
        heading: 'Beranda',
        body: 'Ini adalah beranda',
    }
    response.render('index.ejs', obj)
})

router.use('/teachers', routersTeacher);
router.use('/students', routersStudent);
router.use('/subjects', routersSubject);

module.exports = router;