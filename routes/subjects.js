const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/',(req, res)=> {
    Model.Subject.findAll({
        include:[Model.Teacher]
    }).then(data=>{
        // res.send(data)
        res.render('./subject/v_listSubject', {subject:data})
    }).catch(err=>res.send(err))
})
let objSubject ={
    subject_name : '',
}
router.get('/add',(req, res)=> {
    res.render('./subject/v_subjectForm',{subject:objSubject, action:'add'})          
})
router.post('/add',(req, res)=> {
    Model.Subject.create({
        subject_name :req.body.subject_name,
   }).then(()=>{
       res.redirect('/subjects')
   }).catch(err=>{
       res.send(err)
   })
})

router.get('/edit/:id',(req, res)=> {
    Model.Subject.findById(req.params.id).then(dataSubject=>{
        res.render('./subject/v_subjectForm',{subject:dataSubject, action:'edit'})    
    })         
})
router.post('/edit/:id',(req, res)=> {
    objSubject={
        subject_name :req.body.subject_name,
    }
    Model.Subject.update(objSubject,{
        where:{
            id:req.params.id
        }
   }).then(()=>{
       res.redirect('/subjects')
   }).catch(err=>{
       res.send(err)
   })
})
router.get('/delete/:id',(req, res)=> {
    Model.Subject.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/subjects')
    }).catch(err=>{
        res.send(err)
    })         
})

router.get('/:id/enrolledstudents',(req, res)=> {
    Model.score.findAll({
        where:{
            id_subject:req.params.id
        },
        include:[Model.Student, Model.Subject]
    }).then(data=>{
        // res.send(data)
        res.render('./subject/v_enrollStudents', {score:data})
    }).catch(err=>{
        res.send(err)
    })         
})
router.get('/:idSubject/:idStudent/give-score',(req, res)=> {
    Model.score.findOne({
        where:{
            id_subject:req.params.idSubject,
            id_student:req.params.idStudent,
        },
        include:[Model.Student, Model.Subject]
    }).then(data=>{
        // res.send(data)        
        res.render('./subject/v_giveScore', {score:data})
    }).catch(err=>{
        res.send(err)
    })         
})
router.post('/:idSubject/:idStudent/give-score',(req, res)=> {
    Model.score.update({
        score:req.body.score
    },{
        where:{
            id_subject:req.params.idSubject,
            id_student:req.params.idStudent,
        },
    }).then(()=>{
        res.redirect(`/subjects/${req.params.idSubject}/enrolledstudents`)
    }).catch(err=>{
        res.send(err)
    })         
})
module.exports = router