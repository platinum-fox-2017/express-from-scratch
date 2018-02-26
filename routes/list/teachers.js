const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const teacherlist = express.Router()

teacherlist.use(bodyParser.json())
teacherlist.use(bodyParser.urlencoded({extended: false}))

teacherlist.get('/', (request, response) => {
    model.Teacher.findAll({
        raw:true,
        order: [['id', 'ASC']]
    })
    .then((teachers) => {
        console.log(teachers)
        response.render('teacher-list.ejs', {data: teachers})
    })
})

teacherlist.get('/edit/:id', (request, response) => {
    let identity = request.params.id
    console.log(identity)
    // response.send('hello')
    model.Teacher.findById(identity).then(teacher => {
        // console.log(student.dataValues)
        let obj = teacher.dataValues
        response.render('teacher-edit.ejs', {data: obj})
    })
})

teacherlist.post('/edit/:id', (request, response) => {
    let identity = request.params
    console.log(identity)
    console.log(request.body)
    model.Teacher.update(request.body, {where: identity})
        .then(teacher => {
            console.log(teacher.dataValues)
            response.redirect('/list/teachers')

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