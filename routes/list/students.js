const express = require('express')
const bodyParser = require('body-parser')
const studentList = express.Router()

studentList.get('/', (request, response) => {
    response.render('student-list.ejs')
})

module.exports = studentList