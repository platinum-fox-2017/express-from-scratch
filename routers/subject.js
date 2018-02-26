const {Students,Subject,Score,Teachers} = require ('../models')
const express = require('express')
const router = express.Router()


router.get('/',function(req,res){
  Subject.findAll({order:[
      ['id','ASC']
  ],
    include : [Teachers,Students]
  })
  .then(function(dataSubject){
    res.render('subject.ejs',{dataSubject:dataSubject})
  })
})

router.post('/add',function(req,res){
  let obj = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    id_subject:req.body.id_subject
  }
  Students.create(obj).
  then(function(dataStudents){
    res.redirect(req.get(`referer`))
  }).catch(function(err){
    res.send(err)
  })
})

router.get('/update/:id',(req, res)=> {
    Students.findById(req.params.id).then(dataStudents=>{
      res.render('updateStudents',{dataStudents:dataStudents})
    })
})

router.post('/update/:id',(req, res)=> {
    objStudent={
        name :req.body.name,
        email:req.body.email
    }
    Students.update(objStudent,{
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
    Students.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/students')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/assign/:id',(req,res)=>{
    Students.findById(req.params.id)
    .then(dataStudents=>{
      Subject.findAll()
      .then(dataSubject=>{
        // res.send(dataSubject)
        res.render('assignSubjectStudent',{dataStudents:dataStudents,dataSubject:dataSubject})
      })
    })
})

router.post('/assign/:id',(req,res)=>{
  let obj = {
    score : 0,
    id_subject : parseInt(req.body.id_subject),
    id_student : parseInt(req.params.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  console.log(obj);
  Score.create(obj).
  then(function(){
    console.log(obj);
    res.redirect(`/students`)
  }).catch(function(err){
    res.send(err)
  })
})

module.exports = router;
