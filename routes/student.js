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
    res.render('formStudent')
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
    
  })
})
  
  



module.exports = router