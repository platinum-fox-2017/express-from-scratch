const routes = require('express').Router()
const Models = require('../models')

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })
routes.get('/:subjectid/:studentid/givescore', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // res.send(req.params.studentid)
  Models.StudentSubject.findAll({
    include: [
      {model: Models.Student},
      {model: Models.Subject}
    ],
    where: {SubjectId: req.params.subjectid, StudentId: req.params.studentid}
  }).then(studentsubjects=>{
    // console.log(studentsubjects)
    let studentsubject = studentsubjects[0]
    // res.send(studentsubject)
    res.render('givescore.ejs', {studentsubject: studentsubject})
  }).catch(err=>{
    console.log(err)
  })
})

routes.post('/:subjectid/:studentid/givescore', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // res.send(req.body)
  let obj = {
    score: req.body.score
  }
  Models.StudentSubject.update(obj, {
    where: {SubjectId: req.params.subjectid, StudentId: req.params.studentid}
  }).then(() => {
    res.redirect(`/subject/${req.params.subjectid}/enrolledstudents`)
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/:id/enrolledstudents', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // res.send(req.params.id)
  Models.Student.findAll({
    include: [
      {model: Models.Subject,
      where: {id: req.params.id}},
    ],
    order: [
      ['first_name', 'ASC']
    ]
  }).then(students=>{
      // res.send(students)
      res.render('enrolled-students.ejs', {students: students})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.get('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.params.id)
  Models.Subject.findById(req.params.id)
    .then(data=>{
      res.render('subject-update.ejs', {data: data})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.post('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.body)
  let obj = {
    subject_name: req.body.subject_name
  }
  Models.Subject.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/subject')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/delete/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  Models.Subject.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/subject')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/', (req, res) => {
  Models.Subject.findAll({
    include: [
      {model: Models.Teacher}
    ],
    order: [
      ['id', 'ASC']
    ]
  }).then(data=>{
    // console.log(data)
    // res.send(data)
    res.render('subject.ejs', {subject:data})
  }).catch(err=>{
    console.log(err)
  })
})

routes.post('/', (req, res) => {
  // console.log(req.body);
  let obj = {
    subject_name: req.body.subject_name
  }
  Models.Subject.create(obj)
    .then(data => {
      res.redirect('/subject')
    })
    .catch(err=>{
      console.log(err)
    })
})


module.exports = routes;