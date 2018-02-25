const express = require('express')
const app = express()

const models = require('../models')
let router = express.Router();

router.get('/',function(req,res){
  // res.render('student')
  models.Student.findAll().then(dataStudent=>{
    res.render('student',{data:dataStudent})
  }).catch(err=>{
    console.log(err);
    
  })
})

router.get('/add',function(req,res){
  //posting new student
  res.render('formStudent')
})
router.post('/add',function(req,res){
  let obj={
    first_name:req.body.first_name,
    last_name : req.body.last_name,
    email:req.body.email,
    createdAt : new Date(),
    updatedAt : new Date()
  }
  models.Student.create(obj).then(addData=>{
    res.redirect('/students')
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/edit/:id',function(req,res){
// res.render('form_edit_student')
  let id = req.params.id
  // console.log(id)
  models.Student.findById(id).then(detail=>{
    // console.log(JSON.parse(JSON.stringify(detail)))
    res.render('form_edit_student',{dataStudent : detail})
  })
})

router.post('/edit/:id',function(req,res){
  let id = req.params.id
  let obj={
    first_name:req.body.first_name,
    last_name : req.body.last_name,
    email:req.body.email,
    updatedAt : new Date()
  }
  models.Student.update(obj,{where:{id:id}}).then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',function(req,res){
  let id = req.params.id
  console.log(id)
  models.Student.destroy({where:{id:id}}).then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    res.send(err)
  })

})
  
  



module.exports = router