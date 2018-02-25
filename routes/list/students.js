const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const studentList = express.Router()

studentList.get('/', (request, response) => {
    model.Student.findAll({
        raw:true,
        order: [['id', 'ASC']]
    })
    .then((students) => {
        console.log(students)
        response.render('student-list.ejs', {data: students})
    })
})

module.exports = studentList