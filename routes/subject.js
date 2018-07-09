const express = require('express')
const app = express()
let router = express.Router();

const models = require('../models')
const convertScore = require('../helpers/convertScore')


router.get('/', function (req, res) {
  models.Subject.findAll({
    include:[models.Teacher]
  }).then(detail=>{
    // console.log(JSON.parse(JSON.stringify(detail[0])))
    res.render('subject',{data:detail})
  }).catch(err=>{
    res.send(err)
  })
  
})
router.get('/add',function(req,res){
  res.render('formSubject')
})
router.post('/add',function(req,res){
  let obj={
    subject_name:req.body.subject_name,
    createdAt : new Date(),
    updatedAt : new Date()
  }
  models.Subject.create(obj).then(addData=>{
    res.redirect('/subjects')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',function(req,res){
  let id = req.params.id
  // console.log(id)
  models.Subject.findById(id).then(detail=>{
    // console.log(JSON.parse(JSON.stringify(detail)))
    res.render('form_edit_subject',{dataSubject : detail})
  })
})

router.post('/edit/:id',function(req,res){
  let id = req.params.id
  let obj={
    subject_name:req.body.subject_name,
    createdAt : new Date(),
    updatedAt : new Date()
  }
  models.Subject.update(obj,{where:{id:id}}).then(()=>{
    res.redirect('/subjects')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',function(req,res){
  let id = req.params.id
  // console.log(id)
  models.Subject.destroy({where:{id:id}}).then(()=>{
    res.redirect('/subjects')
  }).catch(err=>{
    res.send(err)
  })

})

router.get('/:id/enrolledstudents',function(req,res){
  let id = req.params.id
  models.Student_subject.findAll({
    where:{id_subject:id},
    include:[models.Student,models.Subject],
    order:[[models.Student,'first_name','ASC']]
  }).then(detail=>{
    // console.log(JSON.parse(JSON.stringify(detail)))
    res.render('enrolledStudent',{data:detail,convert:convertScore})
    // res.send(detail)
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/:id_subject/:id_student/givescore',function(req,res){
  models.Student_subject.findOne({
    where:{
    id_subject:req.params.id_subject,
    id_student:req.params.id_student},
    include:[models.Student,models.Subject]}).then(detail=>{
      // console.log(JSON.parse(JSON.stringify(detail)))
      // console.log(`subj ${req.params.id_subject} stud ${req.params.id_student}`)
      res.render('givescore',{data:detail})
    }).catch(err=>{
      res.send(err)
    })
})

router.post('/:id_subject/:id_student/givescore',function(req,res){
  let obj = {
    score : req.body.score
  }
  models.Student_subject.update(obj,{where:{
    id_subject:req.params.id_subject,
    id_student:req.params.id_student
  }}).then(()=>{
    res.redirect(`/subjects/${req.params.id_subject}/enrolledstudents`)
  }).catch(err=>{
    res.send(err)
  })
})


module.exports = router