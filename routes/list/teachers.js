const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const teacherlist = express.Router()

teacherlist.get('/', (request, response) => {
    model.Teacher.findAll({
        raw:true,
        order: [['id', 'ASC']]
    })
    .then((teachers) => {
        console.log(teachers)
        response.render('teacher-list.ejs', {data: teachers})
    })
})

module.exports = teacherlist