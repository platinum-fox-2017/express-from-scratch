'use strict';

const teacherController = require('../controllers').teacher;
const router = require('express').Router();

router.get('/', teacherController.showAll);

router.get('/add', teacherController.showAddForm);
router.post('/add', teacherController.create);

router.get('/edit/:id', teacherController.showEditForm);
router.post('/edit/:id', teacherController.update);

router.post('/delete/:id', teacherController.destroy);

module.exports = router;