const express = require('express')
const Router = express.Router()
const Models = require('../models')

const Subject = Models.Subject
const Subject_Student = Models.subject_student
const Student = Models.Student
const Teacher = Models.Teacher

Router.get('/',(req,res)=>{
    Subject.findAll({include:[Teacher]}).then(SubjectData=>{
        let parse = JSON.parse(JSON.stringify(SubjectData))
        res.render('subject/subject',{
            data: SubjectData
        })
    })
})

Router.get('/:id/enroll',(req,res)=>{
    let idSubject = Number(req.params.id)
    Subject_Student.findAll({where:{subjectId:idSubject},include: [Student]}).then(result=>{
        let parse = JSON.parse(JSON.stringify(result))
        res.render('subject/subjectScore',{
            data: parse
        })
    })
})

Router.get('/:subjectId/enroll/:studentId',(req,res)=>{

    let studentId = Number(req.params.studentId)
    let subjectId = Number(req.params.subjectId)
    
    Subject_Student.findAll({where:{
        studentId: studentId,
        subjectId: subjectId
    },include: [Subject,Student]}).then(hasil=>{
        let parse = JSON.parse(JSON.stringify(hasil))
        res.render('subject/assignScore',{
          data: parse[0]
        })
    })
})


Router.post('/:subjectId/enroll/:studentId',(req,res)=>{
    let studentId = Number(req.params.studentId)
    let subjectId = Number(req.params.subjectId)
    let score = {score:Number(req.body.score)}
    Subject_Student.update(score,{where:{
        studentId: studentId,
        subjectId: subjectId
    }}).then(result=>{
        res.redirect(`/subject/${subjectId}/enroll`)
    })
})

Router.get('/enroll/back',(req,res)=>{
    res.redirect('/subject')
})

Router.get('/back',(req,res)=>{
    res.redirect('/')
})

module.exports = Router