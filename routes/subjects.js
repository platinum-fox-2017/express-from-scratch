const express = require('express');
const router = express.Router();

const Model = require('../models');
const Subjects = Model.Subjects;

router.get('/',(req,res,next) => {
    Subjects.findAll()
    .then((data_subjects) => {
        console.log(data_subjects[0].dataValues);
        res.render('subjects', {
            data: data_subjects
        });
    });
});

module.exports = router;