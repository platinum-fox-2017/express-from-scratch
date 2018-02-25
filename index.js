'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()


const PORT = 8000

// SETTING BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// SETTING TEMPLATE ENGINE
app.set ('view engine', 'ejs')

// SETTING STATIC FILES
app.use(express.static('public'))

// ROUTES
app.get('/', (request, response) => {
    response.render('home.ejs')
})

app.get('/students.html', (request, response) => {
    response.render('student-form.ejs')
})

app.post('/students.html', (request, response) => {
    console.log(request.body)
    console.log(Object.values(request.body))
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            response.render('student-form.ejs')
        }
    }
    response.render('register-success.ejs')
})

app.get('/students-list.html', (request, response) => {
    response.render('list-students.ejs')
})


app.get('/teachers.html', (request, response) => {
    response.render('teacher-form.ejs')
})

app.post('/teachers.html', (request, response) => {
    console.log(request.body)
    console.log(Object.values(request.body))
    let answer = Object.values(request.body)
    for (let i = 0; i < answer.length; i++){
        if(answer[i] === ''){
            response.render('teachers-form.ejs')
        }
    }
    response.render('register-success.ejs')
})

app.get('/teachers-list.html', (request, response) => {
    response.render('list-teachers.ejs')
})




app.get('/register-success.html', (request, response) => {
    response.render('register-success.ejs')
})


//-----------------------------------
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})


