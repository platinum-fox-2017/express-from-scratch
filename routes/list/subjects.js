const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const subjectlist = express.Router()

subjectlist.use(bodyParser.json())
subjectlist.use(bodyParser.urlencoded({extended: false}))

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

subjectlist.get('/edit/:id', (request, response) => {
    let identity = request.params.id
    console.log(identity)
    // response.send('hello')
    model.Subject.findById(identity).then(student => {
        // console.log(student.dataValues)
        let obj = student.dataValues
        response.render('subject-edit.ejs', {data: obj})
    })
})

subjectlist.post('/edit/:id', (request, response) => {
    let identity = request.params
    console.log(identity)
    console.log(request.body)
    model.Subject.update(request.body, {where: identity})
        .then(subject => {
            console.log(subject.dataValues)
            response.redirect('/list/subjects')

    })
})


module.exports = subjectlist