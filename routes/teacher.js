const routes = require('express').Router()
const Models = require('../models')


// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })
routes.get('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.params.id)
  Models.Teacher.findById(req.params.id)
    .then(teacher=>{
      Models.Subject.findAll().then(subjects=>{
        // res.send(subjects[0].subject_name)
        res.render('teacher-update.ejs', {teacher: teacher, subjects: subjects})
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.post('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // res.send(req.body)
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  }
  Models.Teacher.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/teacher')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/delete/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  Models.Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/teacher')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/', (req, res) => {
  Models.Teacher.findAll({
    include: [{
      model: Models.Subject
    }],
    order: [
      ['first_name', 'ASC']
    ]
  }).then(data=>{
    // console.log(data[0].Subject)
    // res.send(data)
    res.render('teacher.ejs', {teacher:data})
  }).catch(err=>{
    console.log(err)
  })
})

routes.post('/', (req, res) => {
  // console.log(req.body);
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  Models.Teacher.create(obj)
    .then(data => {
      res.redirect('/teacher')
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports = routes;