const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const subjectlist = express.Router()

subjectlist.get('/', (request, response) => {
    model.Subject.findAll({
        raw:true,
        order: [['id', 'ASC']]
    })
    .then((subjects) => {
        console.log(subjects)
        response.render('subject-list.ejs', {data: subjects})
    })
})

module.exports = subjectlist