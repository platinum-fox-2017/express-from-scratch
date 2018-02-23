'use strict'

var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.render('user')
})

router.post('/', (req, res) => {
    //method here
    res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
    res.render('user-detail')
})

router.post('/edit/:id', (req, res) => {
    //method here
    res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
    // res.render('user-detail')
})

module.exports = router