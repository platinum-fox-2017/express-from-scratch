const {Teachers,Subject} = require ('../models')
const express = require('express')
const router = express.Router()


router.get('/',function(req,res){
  Teachers.findAll({order:[
      ['id','ASC']
  ],
    include : [Subject]
  })
  .then(function(dataTeachers){
    Subject.findAll()
    .then(function(dataSubject){
    res.render('teachers.ejs',{dataTeachers:dataTeachers,dataSubject:dataSubject})
    })
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
  Teachers.create(obj).
  then(function(dataTeachers){
    res.redirect(req.get(`referer`))
  }).catch(function(err){
    res.send(err)
  })
})

router.get('/update/:id',(req, res)=> {
    Teachers.findById(req.params.id).then(dataTeacher=>{
        Subject.findAll().then(dataSubject=>{
            // res.send(dataTeacher)
            res.render('updateTeacher',{dataSubject:dataSubject,dataTeacher:dataTeacher})
        })
    })
})

router.post('/update/:id',(req, res)=> {
    objTeacher={
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        email:req.body.email,
        id_subject:req.body.id_subject,
    }
    Teachers.update(objTeacher,{
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
    Teachers.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/teachers')
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router;
