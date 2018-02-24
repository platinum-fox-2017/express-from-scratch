'use strict'
const express = require('express')
const router = express.Router()
const { Teacher } = require('../models')

router.get('/', function (req, res) {
    Teacher.findAll().then((datas) => {
        res.render('teacher', { datas: datas })
    }).catch((err) => {
        console.log(err)
    })
})

// router.post('/', (req, res) => {
//     //method here
//     res.redirect('/')
// })

// router.get('/edit/:id', (req, res) => {
//     res.render('user-detail')
// })

// router.post('/edit/:id', (req, res) => {
//     //method here
//     res.redirect('/')
// })

// router.get('/edit/:id', (req, res) => {
//     // res.render('user-detail')
// })

module.exports = router