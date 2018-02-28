const routes = require('express').Router()
const Models = require('../models')

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })

routes.get('/', (req, res) => {
  Models.Student.findAll({
    order: [
      ['first_name', 'ASC']
    ], include: [{
      model: Models.Subject
    }]
  }).then(data=>{
    // res.send(data)
    res.render('student-form.ejs', {student:data})
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
  Models.Student.create(obj)
    .then(data => {
      res.redirect('/student')
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.get('/:id/addsubject', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.params.id)
  Models.Student.findById(req.params.id)
    .then(student=>{
      Models.Subject.findAll().then(subjects=>{
        // res.send(subjects)
        res.render('add-subject.ejs', {student: student, subjects: subjects})
      })
      .catch(err=>{
        console.log(err)
      })
      // res.send(student)
      // res.render('add-subject.ejs', {data: data})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.post('/:id/addsubject', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // res.send(req.body)
  let obj = {
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId
  }
  console.log(obj)
  Models.StudentSubject.create(obj)
    .then(data => {
    res.redirect('/student')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.params.id)
  Models.Student.findById(req.params.id)
    .then(data=>{
      res.render('student-update.ejs', {data: data})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.post('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.body)
  let obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  Models.Student.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/student')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/delete/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  Models.Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/student')
  }).catch(err => {
    console.log(err)
  })
})

module.exports = routes;