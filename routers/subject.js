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
    name:req.body.first_name,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  Subject.create(obj).
  then(function(dataStudents){
    res.redirect(req.get(`referer`))
  }).catch(function(err){
    res.send(err)
  })
})

router.get('/update/:id',(req, res)=> {
    Subject.findById(req.params.id).then(dataSubjects=>{
      res.render('updateSubject',{dataSubjects:dataSubjects})
    })
})

router.post('/update/:id',(req, res)=> {
    objSubject={
        name :req.body.name
    }
    Subject.update(objSubject,{
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
    Students.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/subjects')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/enroll/:id',(req,res)=>{
    Subject.findOne({
      where:{
        id : req.params.id,
      },
      include : [Students]
    })
    .then(dataSubject=>{
      // res.send(dataSubject)
      res.render('showEnrollStudents',{dataSubject:dataSubject})
    })
})

router.get('/assignScore/:id/:id2', (req,res) => {
    Score.findAll({
      where:{

      }
    }).then(dataScore=>{
      Students.findOne({
        where:{
          id:req.params.id
        }
      })
      .then(dataStudents=>{
        Subject.findOne({
          where:{
            id:req.params.id2
          }
        }).then(dataSubject=>{
          // res.send(dataSubject)
          res.render('assignScore',{dataScore:dataScore,dataStudents:dataStudents,dataSubject:dataSubject})
        })
      })
    })
})


router.post('/assignScore/:id/:id2',(req,res)=>{
  let obj = {
    score : req.body.score,
  }
  Score.update(obj,{
    where:{
      id_student:req.params.id,
      id_subject:req.params.id2
    }
  }).
  then(function(){
    res.redirect(`/subjects`)
  }).catch(function(err){
    res.send(err)
  })
})

module.exports = router;
