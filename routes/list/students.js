const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const studentList = express.Router()

studentList.use(bodyParser.json())
studentList.use(bodyParser.urlencoded({extended: false}))

studentList.get('/', (request, response) => {
    model.Student.findAll({
        raw:true,
        order: [['first_name', 'ASC']]
    })
    .then((students) => {
        console.log(students)
        response.render('student-list.ejs', {data: students})
    })
})

studentList.get('/edit/:id', (request, response) => {
    let identity = request.params.id
    console.log(identity)
    // response.send('hello')
    model.Student.findById(identity).then(student => {
        // console.log(student.dataValues)
        let obj = student.dataValues
        response.render('student-edit.ejs', {data: obj})
    })
})

studentList.post('/edit/:id', (request, response) => {
    let identity = request.params
    console.log(identity)
    console.log(request.body)
    model.Student.update(request.body, {where: identity})
        .then(student => {
            console.log(student.dataValues)
            response.redirect('/list/students')

    })
})

studentList.get('/delete/:id', (request, response) => {
    let identity = request.params
    console.log(identity)

    model.Student.destroy({where: identity})
        .then(()=>{
            console.log(`record with id ${identity} is deleted`)
    })
    response.redirect('/list/students')
})


studentList.get('/:id/addsubject', (req, res) => {
    let identity = req.params.id
    model.Subject.findAll().then(subjects => {
        model.Student.findById(identity).then(student => {
            // res.send(student)
            // res.send(subjects)
            res.render('student-addsubject.ejs', {profile: student, subject: subjects})
        })
    })
})

studentList.post('/:id/addsubject', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    // res.send(req.body)
    model.StudentSubject.create({
        StudentId: req.params.id,
        SubjectId: req.body.SubjectId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then((data) => {
        console.log(data)
    })
    res.redirect('/list/students')
})

module.exports = studentList