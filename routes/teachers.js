const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/',(req, res)=> {
    Model.Teacher.findAll({
        include:[Model.Subject]
    }).then(data=>{
        // res.send(data)            
        res.render('./teacher/v_listTeacher', {teacher:data})            
    }).catch(err=>res.send(err))
})
let objTeacher ={
    first_name : '',
    last_name : '',
    email:'',
    id_subject:''
}
router.get('/add',(req, res)=> {
    Model.Subject.findAll().then(data=>{
        res.render('./teacher/v_teacherForm',{subject:data,teacher:objTeacher, action:'add'})  
    })          
})
router.post('/add',(req, res)=> {
    Model.Teacher.create({
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        email:req.body.email,
        id_subject:req.body.id_subject,
   }).then(()=>{
       res.redirect('/teachers')
   }).catch(err=>{
       res.send(err)
   })
})

router.get('/edit/:id',(req, res)=> {
    Model.Teacher.findById(req.params.id).then(dataTeacher=>{
        Model.Subject.findAll().then(dataSubject=>{
            res.render('./teacher/v_teacherForm',{subject:dataSubject,teacher:dataTeacher, action:'edit'})  
        }) 
    })         
})
router.post('/edit/:id',(req, res)=> {
    objTeacher={
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        email:req.body.email,
        id_subject:req.body.id_subject,
    }
    Model.Teacher.update(objTeacher,{
        where:{
            id:req.params.id
        }
   }).then(()=>{
       res.redirect('/teachers')
   }).catch(err=>{
       res.send(err)
   })
})
router.get('/delete/:id',(req, res)=> {
    Model.Teacher.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/teachers')
    }).catch(err=>{
        res.send(err)
    })         
})

module.exports = router