const express = require('express')
const bodyParser = require('body-parser')
const teacher = express.Router()

teacher.use(bodyParser.json())
teacher.use(bodyParser.urlencoded({extended: false}))

teacher.get('/', (request, response) => {
    response.render('teacher-add.ejs')
})

teacher.post('/', (request, response) => {
    console.log(request.body)
    console.log(Object.values(request.body))
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            return response.render('teacher-add.ejs')
        }
    }
    response.render('register-success.ejs')
})

module.exports = teacher