const express = require('express')
const bodyParser = require('body-parser')
const student = express.Router()

student.use(bodyParser.json())
student.use(bodyParser.urlencoded({extended: false}))

student.get('/', (request, response) => {
    response.render('student-add.ejs')
})

student.post('/', (request, response) => {
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            return response.render('student-add.ejs')
        }
    }
    response.render('register-success.ejs')
})

module.exports = student