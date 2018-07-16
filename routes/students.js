const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/',(req, res)=> {
    Model.Student.findAll({
        order:[
            ['first_name','ASC']
        ],
    }).then(data=>{
        res.render('./student/v_listStudent', {student:data})
    }).catch(err=>res.send(err))
})
let objStudent ={
    first_name : '',
    last_name : '',
    email:'',
}
router.get('/add',(req, res)=> {
    res.render('./student/v_studentForm',{student:objStudent, action:'add', error:null})          
})
router.post('/add',(req, res)=> {
    Model.Student.create({
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        email:req.body.email,
   }).then(()=>{
       res.redirect('/students')
   }).catch(err=>{
        res.render('./student/v_studentForm',{student:objStudent, action:'add', error:err.errors[0].message})          
   })
})

router.get('/edit/:id',(req, res)=> {
    Model.Student.findById(req.params.id).then(datastudent=>{
        res.render('./student/v_studentForm',{student:datastudent, action:'edit', error:null})    
    })         
})
router.post('/edit/:id',(req, res)=> {
    objStudent={
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        email:req.body.email,
    }
    Model.Student.update(objStudent,{
        where:{
            id:req.params.id
        }
   }).then(()=>{
       res.redirect('/students')
   }).catch(err=>{
       res.send(err)
   })
})
router.get('/delete/:id',(req, res)=> {
    Model.Student.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/students')
    }).catch(err=>{
        res.send(err)
    })         
})
router.get('/:id/addsubject',(req, res)=> {
    Model.Student.findById(req.params.id).then(dataStudent=>{
        Model.Subject.findAll().then(dataSubject=>{
            res.render('./student/v_addSubject', {student:dataStudent, subject:dataSubject})
        })
    }).catch(err=>{
        res.send(err)
    })         
})
router.post('/:id/addsubject',(req, res)=> {
    Model.score.create({
        id_student:req.params.id,
        id_subject:req.body.id_subject
    }).then(()=>{
        res.redirect('/students')
    }).catch(err=>{
        res.send(err)
    })         
})

module.exports = router