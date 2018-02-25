const express = require('express')
const router = express.Router()
const {subject,teacher,subject_student,student} = require('../models')


router.get('/',(req,res)=>{
    subject.findAll({include:teacher}).then(data=>{
        res.render('subject.ejs',{data:data})
    }).catch(err=>{
        res.send(err)
    })    
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    subject.destroy({where:{id:id}}).then(data=>{
        res.redirect('/subject')
    })
})

router.get('/:id/enrolledstudent',(req,res)=>{
    let id = req.params.id
    subject.findById(id,{include:[student,subject_student]}).then(data=>{
        // res.send(data.students[0])
        res.render('subject_enrolled',{data:data})
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/:id/givescore',(req,res)=>{
    let id = req.params.id
    student.findById(id).then(data =>{
        res.render('score',{student:data})
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/:id/givescore',(req,res)=>{
    let id = req.params.id
    let obj = {
        score : req.body.score  
    }
    subject_student.update(obj,{where:{id_student:id}}).then(data=>{
        res.redirect('/subject')
    }).catch(err=>{
        res.send(err)
    })
})
module.exports = router