const express = require('express')
const route = express.Router();
const app = express();
const Student = require('../controller/index.js').Student;
const db = require('../models/index.js');

// /student
route.get('/', (req, res)=>{
  // get all students
  Student.tableResponse(res)
  // res.render('form.ejs', { title:'Student', h1:'Student Data'})
});

// ############# ADD DATA ####################
route.get('/add', (req, res)=>{
  // get form for students
  res.render('form.ejs', { title:'Student', h1:'Student Data', path:'students'})
});

route.post('/send', (req, res)=>{
  // console.log(req.body);
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let options = [first_name, last_name, email];
  // Controller => add student => view render tableResponse
  Student.addStudent(options, res)
  // res.render('home.ejs', { title:'Student', h1:`Student Name : ${first_name} ${last_name} email : ${email}`});
});

// ################# EDIT ####################
route.get('/edit/:id', (req, res)=>{
  let id = req.param('id')
  // console.log(id);
  // res.send([id])
  // get edit form for students
  // execute through controller => update student => view with res.render
  res.render('formEdit.ejs', { title:'Edit Student', h1:'Edit Student Data', id: id, path:'students'})
});

route.post('/edit/:id', (req, res)=>{
  // console.log(req.params.id);
  // console.log('received success');
  // get request from edit page
  let id = req.params.id
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let options = [id, first_name, last_name, email];
  // console.log(options);
  // Controller => edit student => view render tableResponse
  Student.updateStudent(options, res)
  // Student.addStudent(options, res)
  // res.render('home.ejs', { title:'Student', h1:`Student Name : ${first_name} ${last_name} email : ${email}`});
});


// ################# DELETE ####################
route.get(`/delete/:id`, (req, res)=>{
  let options = [req.params.id]
  // sent alert to webpage
  // if (window.confirm('Do you want to delete this student record?')) {
    Student.deleteStudent(options, res)
  // }
  // res.render('formEdit.ejs', { title:'Student', h1:'Edit Student Data'})
});



// ################# SUBJECT ####################
route.get('/:id/addsubject', (req, res)=>{
  let id = req.param('id')
  db.Student.findOne({
    where:{id:id}
  }).then((foundStudent)=>{
    res.render('formAddSubject.ejs',
    { title:'Edit Student',
      h1:'Add Subject to Student',
      id: id,
      path:'students',
      foundStudent:foundStudent
    })
  })

});

route.post('/:id/addsubject', (req, res)=>{
  console.log('logging post');
  console.log(req.param('id'));
  console.log(req.body);
  // let id = req.params.id
  // let first_name = req.body.first_name;
  // let last_name = req.body.last_name;
  // let email = req.body.email;
  // let options = [id, first_name, last_name, email];
  Student.updateSubject(req.body.Subject, req.param('id'))
});


module.exports = route



// module.exports = function(app){
//   'use strict'
//
//   // menampilkan form untuk menginput data student
//   app.get('/student', (req, res)=>{
//     res.render('form.ejs', { title:'Student', h1:'Student Data'})
//   })
//   // menerima data form untuk add student
//   app.post('/send', (req, res)=>{
//     // console.log(req.body);
//     let studentName = req.body.studentName;
//     let studentAge = req.body.age
//     res.render('home.ejs', { title:'Student', h1:`Student Name : ${studentName} Age : ${studentAge}`})
//   })
// }
