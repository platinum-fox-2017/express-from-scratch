const express = require('express')
const bodyParser = require('body-parser')
const model = require('../../models')
const subjectlist = express.Router()

subjectlist.use(bodyParser.json())
subjectlist.use(bodyParser.urlencoded({extended: false}))

subjectlist.get('/', (request, response) => {
    model.Subject.findAll({
        include: [{
            model: model.Teacher
        }],
        order: [['id', 'ASC']]
    })
    .then((subjects) => {
        // console.log(subjects)
        // response.send(subjects)
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

subjectlist.get('/:id/enrolledstudents', (req,res)=> {
    // res.send('hello')
    model.Subject.findAll({
        include: [{
            model: model.StudentSubject
        },{
            model: model.Student
        }],
        where: {id: req.params.id}
    })
    .then(data => {
        // res.send(data)
        res.render('subject-enrolled.ejs', {data: data})
    })
})

subjectlist.get('/:subjectid/givescore/:studentid', (req,res)=> {
    // res.send('hello')
    res.render('subject-score.ejs')
})

subjectlist.post('/:subjectid/givescore/:studentid', (req,res)=> {
    console.log(req.params.studentid)
    console.log(req.params.subjectid)
    // res.send(req.params.studentid)
    console.log(req.body.Score)
    model.StudentSubject.update({ 
        Score: req.body.Score
    }, {
        where: {
            StudentId: req.params.studentid,
            SubjectId: req.params.subjectid
        }
    })
    .then(result => {
        console.log(result)
        res.redirect('/list/subjects')
    })
})


module.exports = subjectlist