const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const subject = express.Router()

subject.use(bodyParser.json())
subject.use(bodyParser.urlencoded({extended: false}))

subject.get('/', (request, response) => {
    response.render('subject-add.ejs')
})

subject.post('/', (request, response) => {
    console.log(request.body)
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            return response.render('subject-add.ejs')
        }
    }
    model.Subject.create(request.body)
    .then(() => {
        console.log(`The following object was added to subject's list:
        ${request.body}`)
    })

    response.render('register-success.ejs')
})

module.exports = subject