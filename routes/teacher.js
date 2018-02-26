const express = require('express')
const app = express()

const models = require('../models')
let router = express.Router();

router.get('/', function (req, res) {
  models.Teacher.findAll({include:[models.Subject],order:[['first_name','asc']]}).then(detail=>{
    res.render('teacher',{data:detail})
    // console.log(JSON.parse(JSON.stringify(detail)))
  }).catch(err=>{
    res.send(err)
  })
  
})
router.get('/add',function(req,res){
  res.render('formTeacher')
})
router.post('/add',function(req,res){
  let obj={
    first_name:req.body.first_name,
    last_name : req.body.last_name,
    email:req.body.email,
    id_subject : req.body.id_subject,
    createdAt : new Date(),
    updatedAt : new Date()
  }
  models.Teacher.create(obj).then(addData=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/edit/:id',function(req,res){

    let id = req.params.id
    // console.log(id)
    models.Teacher.findById(id).then(detail=>{
      // console.log(JSON.parse(JSON.stringify(detail)))
      models.Subject.findAll().then(dataSubjet=>{
        res.render('form_edit_teacher',{dataTeacher : detail,subject:dataSubjet})
      }).catch(errS=>{
        res.send(errS)
      })
      
    }).catch(errT=>{
      res.send(errT)
  })
})
router.post('/edit/:id',function(req,res){
  let id = req.params.id
  let obj={
    first_name:req.body.first_name,
    last_name : req.body.last_name,
    email:req.body.email,
    id_subject : req.body.id_subject,
    updatedAt : new Date()
  }
  models.Teacher.update(obj,{where:{id:id}}).then(()=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',function(req,res){
  let id = req.params.id
  // console.log(id)
  models.Teacher.destroy({where:{id:id}}).then(()=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.send(err)
  })

})

module.exports = router