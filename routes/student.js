'use strict';

const studentController = require('../controllers').student;
const router = require('express').Router();

router.get('/', studentController.showAll);

router.get('/add', studentController.showAddForm);
router.post('/add', studentController.create);

router.get('/edit/:id', studentController.showEditForm);
router.post('/edit/:id', studentController.update);

router.post('/delete/:id', studentController.destroy);

router.get('/:id/addsubject', studentController.showAddSubjectForm)
router.post('/:id/addsubject', studentController.addSubject)

module.exports = router;