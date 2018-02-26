const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const teacherlist = express.Router()

teacherlist.use(bodyParser.json())
teacherlist.use(bodyParser.urlencoded({extended: false}))

teacherlist.get('/', (request, response) => {
    console.log(request.body)
    model.Teacher.findAll({
        
        order: [['id', 'ASC']],
        include: [
            {model: model.Subject}
        ]
    })
    .then((teachers) => {
        // console.log(teachers)
        // model.Subject.findById(teachers.)
        // response.send(teachers)
        response.render('teacher-list.ejs', {data: teachers})
    })
})

teacherlist.get('/edit/:id', (request, response) => {
    let identity = request.params.id
    console.log(identity)
    // response.send('hello')
    model.Subject.findAll().then(subjects => {
        // console.log(subjects)
        model.Teacher.findById(identity).then(teacher => {
            // console.log(student.dataValues)
            let obj = teacher.dataValues
            response.render('teacher-edit.ejs', {data: obj, subject: subjects})
        })
    })
})

teacherlist.post('/edit/:id', (request, response) => {
    let identity = request.params
    console.log(identity)
    console.log(request.body)
    model.Subject.findById(request.body.SubjectId).then(data => {
        let subjectName = data.dataValues.subject_name
        model.Teacher.update(
            {
                // id: request.body.id,
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                SubjectId: request.body.SubjectId,
                // SubjectId: subjectName
            }, {
                where: identity
            })
            .then(teacher => {
                console.log(teacher.dataValues)
                response.redirect('/list/teachers')
    
        })
        
    })
})

teacherlist.get('/delete/:id', (request, response) => {
    let identity = request.params
    console.log(identity)

    model.Teacher.destroy({where: identity})
        .then(()=>{
            console.log(`record with id ${identity} is deleted`)
    })
    response.redirect('/list/teachers')
})


module.exports = teacherlist