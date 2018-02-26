const express = require('express')
const router = express.Router()
const {teacher,subject} = require('../models')


router.get('/',(req,res)=>{
    teacher.findAll({include:subject,
                    order:[['first_name','asc']]
    }).then(data=>{
        res.render('teacher.ejs',{data:data})
    }).catch(err=>{
        res.send(err)
    })    
})

router.get('/add',(req,res)=>{
    subject.findAll().then(subject=>{
        res.render('addTeacher',{subject:subject})
    })
})

router.post('/add',(req,res)=>{
    let obj = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        id_subject: req.body.id_subject
    }
    teacher.create(obj).then(data=>{
        res.redirect('/teacher')
    })
})

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id
    teacher.findById(id).then(data=>{
        subject.findAll().then(subject =>{
            res.render('editTeacher',{data:data,subject:subject})
        })
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/edit/:id',(req,res)=>{
    let obj = {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email,
        id_subject  : req.body.id_subject 
    }
    let id = req.params.id
    teacher.update(obj,{where:{id:id}}).then(data=>{
        res.redirect('/teacher')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    teacher.destroy({where:{id:id}}).then(data=>{
        res.redirect('/teacher')
    })
})

module.exports = router