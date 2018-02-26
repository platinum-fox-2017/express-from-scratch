const express = require('express');
const { Subject, Teacher } = require('../models')
const router = express.Router();

router.get('/', (req,res) => { 
    Subject.findAll({include: Teacher})
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data))
        console.log(convertData[1].Teachers[4])
        res.render('subject', {data} )
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/add', (req,res) => {
    Subject.create({subject_name: req.body.subject_name})
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/edit/:id', (req,res) => {
    Subject.findById(req.params.id)
    .then(data => {
        console.log(data)
        res.render('subject_edit', { data })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/edit/:id', (req,res) => {
    Subject.update({subject_name: req.body.subject_name}, {
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/delete/:id', (req,res) => {
    Subject.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/subject')
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router