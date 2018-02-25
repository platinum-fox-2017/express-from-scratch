const express = require('express')
const bodyParser = require('body-parser')
const teacherlist = express.Router()

teacherlist.get('/', (request, response) => {
    response.render('teacher-list.ejs')
})

module.exports = teacherlist