const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const student = express.Router()

student.use(bodyParser.json())
student.use(bodyParser.urlencoded({extended: false}))

student.get('/', (request, response) => {
    response.render('student-add.ejs')
})

student.post('/', (request, response) => {
    console.log(request.body)
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            return response.render('student-add.ejs')
        }
    }
    model.Student.create(request.body)
    .then(() => {
        console.log(`the object was successfully added
        ${request.body} `)
    })
    response.render('register-success.ejs')
})

module.exports = student