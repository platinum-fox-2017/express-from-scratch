const express = require('express')
const bodyParser = require('body-parser')
const subject = express.Router()

subject.use(bodyParser.json())
subject.use(bodyParser.urlencoded({extended: false}))

subject.get('/', (request, response) => {
    response.render('subject-add.ejs')
})

subject.post('/', (request, response) => {
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            return response.render('subject-add.ejs')
        }
    }
    response.render('register-success.ejs')
})

module.exports = subject