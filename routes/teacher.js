const express = require('express')
const Router = express.Router()
const Models = require('../models')

const Teacher = Models.Teacher
const Subject = Models.Subject

Router.get('/',(req,res)=>{
    let getAll = Teacher.getAll()
    getAll.then(data=>{
        let test = JSON.parse(JSON.stringify(data))
        res.render('teacher/teacher',{
            teacherData: data,
        })
    })
})

Router.get('/back',(req,res)=>{
    res.redirect('/')
})

Router.get('/edit/:id',(req,res)=>{
    let teacherId = Number(req.params.id)
    Teacher.findById(teacherId).then(teacherData=>{
        Subject.findAll().then(subjectData=>{
            res.render('teacher/teacherEdit',{
                beforeData: teacherData,
                subject: subjectData
            })
        })
    })
})

Router.post('/edit/:id',(req,res)=>{
    let idTeacher = Number(req.params.id)
    let obj = {}
    Object.keys(req.body).forEach((key,index)=>{
        if(key === 'SubjectId'){
            obj[key] = Number(req.body[key])
        }else{
            obj[key] = req.body[key]
        }
    })
    Teacher.update(obj,{where:{id:idTeacher}}).then(result=>{
        res.redirect('/teacher')
    })    
})

Router.get('/delete/:id',(req,res)=>{
    let idTeacher = Number(req.params.id)
    Teacher.destroy({where:{id:idTeacher}}).then(result=>{
        res.redirect(req.get(`referer`))
    })
})

Router.get('/add',(req,res)=>{
    Subject.findAll().then(subject=>{
        res.render('teacher/teacherAdd',{
            subjectData: subject
        })
    })
})

Router.post('/add',(req,res)=>{
    let obj = {}
    Object.keys(req.body).forEach((key,index)=>{
        if(key === 'subjectId'){
            obj[key] = Number(req.body[key])
        }else{
            obj[key] = req.body[key]
        }
    })

    Teacher.create(obj).then(result=>{
        res.redirect('/teacher')
    })
})

module.exports = Router