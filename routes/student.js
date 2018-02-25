const express = require('express')
const router = express.Router()
const {student,subject,subject_student} = require('../models')


router.get('/',(req,res)=>{
    student.findAll().then(data=>{
        res.render('student.ejs',{data:data})
    }).catch(err=>{
        res.send(err)
    })    
})


router.get('/add',(req,res)=>{
    res.render('addStudent')
})


router.post('/add',(req,res)=>{
    let obj = {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email
    }
    student.create(obj).then(data=>{
        res.redirect('/student')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id
    student.findById(id).then(data=>{
        res.render('editStudent',{data:data})
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/edit/:id',(req,res)=>{
    let obj = {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email
    }
    let id = req.params.id
    student.update(obj,{where:{id}}).then(data=>{
        res.redirect('/student')
    }).catch(err=>{
        res.sender(err)
    })
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    student.destroy({where:{id}}).then(data=>{
        res.redirect('/student')
    })
})

router.get('/:id/addSubject',(req,res)=>{
    let id = req.params.id
    student.findById(id).then(data=>{
        subject.findAll().then(data2=>{
            res.render('addSubject_Student',{
                student : data,
                subject : data2
            })
        }).catch(err=>{
            res.send(err)
        })
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/:id/addSubject',(req,res)=>{
    let obj = { 
        id_student : req.params.id,
        id_subject : req.body.id_subject
    }
    subject_student.create(obj).then(data=>{
        res.redirect('/student')
    }).catch(err=>{
        res.send(err)
    })
})


module.exports = router