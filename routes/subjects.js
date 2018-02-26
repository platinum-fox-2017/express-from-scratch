const express = require('express')
const route = express.Router()
const Subject = require('../controller/index.js').Subject;
//
// /subject
// route.get('/', (req, res)=>{
//   Subject.tableResponse(res)
// })

route.get('/', Subject.tableResponse)

// ############# ADD DATA ####################
// route.get('/add', (req, res)=>{
//   res.render('form.ejs', { title:'Subject', h1:'Subject Data', path:'subjects'})
// });

route.get('/add', Subject.form)

// route.post('/send', (req, res)=>{
  // let subject_name = req.body.subject_name;
  // let options = [subject_name];
  // Subject.addSubject(options, res)
// });

route.post('/send', Subject.formPost);

// ################# EDIT ####################
// route.get('/edit/:id', (req, res)=>{
//   let id = req.params.id
//   res.render('formEdit.ejs', { title:'Edit Subject', h1:'Edit Subject Data', id: id, path:'subjects'})
// });
route.get('/edit/:id', Subject.editSubject);

// route.post('/edit/:id', (req, res)=>{
  // let id = req.params.id
  // let subject_name = req.body.subject_name;
  // let options = [id, subject_name];
  // Subject.updateSubject(options, res)
// });
route.post('/edit/:id', Subject.editSubjectPost);

// ################# DELETE ####################
// route.get(`/delete/:id`, (req, res)=>{
  // let options = [req.params.id]
  //   Subject.deleteSubject(options, res)
// });
route.get(`/delete/:id`, Subject.deleteSubjectWeb);


// ################# ENROLLED STUDENTS ####################
// route.get(`/:subjectId/enrolledstudents`, (req, res)=>{
//   let subjectId = req.params.subjectId
//   Subject.subjectStudentsList(res,subjectId);
// });
route.get(`/:subjectId/enrolledstudents`, Subject.subjectStudentsList);

route.get(`/:subjectId/givescore/:studentId`, Subject.giveScore);

route.post('/:subjectId/givescore/:studentId', Subject.submitScore)


module.exports = route
