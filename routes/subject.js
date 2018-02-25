const express = require('express')
const app = express()

const models = require('../models')
let router = express.Router();

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


module.exports = router