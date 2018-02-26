const express = require('express')
const route = express.Router();
const SubjectCRUD = require('../controller/index.js').Subject;

route.get('/', SubjectCRUD.tableResponse);

// ############# ADD DATA ####################
route.get('/add', SubjectCRUD.form);
route.post('/send', SubjectCRUD.formPost);

// ################# EDIT ####################

route.get('/edit/:id', SubjectCRUD.editSubject);
route.post('/edit/:id', SubjectCRUD.editSubjectPost);

// ################# DELETE ####################
route.get(`/delete/:id`, SubjectCRUD.deleteSubjectWeb);

// ################# ENROLLED STUDENTS ####################
route.get(`/:subjectId/enrolledstudents`, SubjectCRUD.subjectStudentsList);
route.get(`/:subjectId/givescore/:studentId`, SubjectCRUD.giveScore);
route.post('/:subjectId/givescore/:studentId', SubjectCRUD.submitScore);


module.exports = route
