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

module.exports = router