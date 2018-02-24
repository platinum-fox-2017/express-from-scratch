const express = require('express')
const Router = express.Router()

const Models = require('../models')

const Student = Models.Student
const Subject = Models.Subject
const Subject_Student = Models.subject_student

Router.get('/',(req,res)=>{
    Student.findAll().then(result=>{
        res.render('student/Student',{
            studentData: result
        })
    })
})

Router.get('/back',(req,res)=>{
    res.redirect('/')
})

Router.get('/add',(req,res)=>{
    res.render('student/studentAdd',{
        err:null
    })
})

Router.post('/add',(req,res)=>{
    Student.create(req.body).then(result=>{
        res.redirect('/student')
    }).catch((err)=>{
        console.log(err)
        let newErr = err.message.split(":")
        let send = newErr[1].trim()
        res.render('student/studentAdd',{
            err: send
        })
    })
})

Router.get('/edit/:id',(req,res)=>{
    Student.findById(Number(req.params.id)).then(result=>{
        res.render('student/studentEdit',{
            beforeData: result
        })
    })
})

Router.post('/edit/:id',(req,res)=>{
    let studentId = Number(req.params.id)
    let obj = {}
    Object.keys(req.body).forEach((key,index)=>{
        if(req.body[key] !== ''){
            obj[key] = req.body[key]
        }
    })

    Student.update(obj,{
        where:{id:studentId}
    }).then(result=>{
        res.redirect('/student')
    })
})

Router.get('/delete/:id',(req,res)=>{
    let idStudent = Number(req.params.id)
    Student.destroy({
        where:{id:idStudent}
    }).then(result=>{
        res.redirect(req.get(`referer`))
    })
})

Router.get('/addSubject/:id',(req,res)=>{
    let studentId = Number(req.params.id)
    Student.findById(studentId).then(result=>{
        Subject.findAll().then(subject=>{
            res.render('student/addSubject',{
                studentData: result,
                subjectData: subject
            })
        })
    })
})

Router.post('/addSubject/:id',(req,res)=>{
    let obj ={
        studentId : Number(req.params.id),
        subjectId : Number(req.body.subjectId)
    }

    Subject_Student.create(obj).then(result=>{
        res.redirect('/student')
    })
})

module.exports = Router