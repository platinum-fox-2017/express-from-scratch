const express = require('express')
const route = express.Router();
const Teacher = require('../controller/index.js').Teacher;

// /teacher
route.get('/', (req, res)=>{
  Teacher.tableResponse(res)
});

// ############# ADD DATA ####################
route.get('/add', (req, res)=>{
  res.render('./teachers_view/formTeachers.ejs', { title:'Teacher', h1:'Teacher Data', path:'teachers'})
});

route.post('/send', (req, res)=>{
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let options = [first_name, last_name, email];
  Teacher.addTeacher(options, res)
});

// ################# EDIT ####################
route.get('/edit/:id', (req, res)=>{
  let id = req.param('id')
  res.render('formEdit.ejs', { title:'Edit Teacher', h1:'Edit Teacher Data', id: id, path:'teachers'})
});

route.post('/edit/:id', (req, res)=>{
  let id = req.params.id
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let options = [id, first_name, last_name, email];
  Teacher.updateTeacher(options, res)
});


// ################# DELETE ####################
route.get(`/delete/:id`, (req, res)=>{
  let options = [req.params.id]
    Student.deleteTeacher(options, res)
});


module.exports = route
