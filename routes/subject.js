const express = require('express')
const router = express.Router()
const { Subject } = require('../models')

router.get('/', function (req, res) {
    Subject.findAll().then((datas) => {
        res.render('subject', { datas: datas })
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router