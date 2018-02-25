'use strict';

const subjectController = require('../controllers').subject;
const router = require('express').Router();

router.get('/', subjectController.showAll);
router.get('/:id/enrolledstudents', subjectController.showStudent);
router.get('/:id/:idScore/giveScore', subjectController.showGiveScoreForm);
router.post('/:id/:idScore/giveScore', subjectController.giveScore);
router.get('/:id/tes', subjectController.showWithStudent);

module.exports = router;