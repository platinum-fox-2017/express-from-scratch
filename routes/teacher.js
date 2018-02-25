const routes = require('express').Router()
const Models = require('../models')


// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })
routes.get('/update/:id', (req, res) => {
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.params.id)
  Models.Teacher.findById(req.params.id)
    .then(data=>{
      res.render('teacher-update.ejs', {data: data})
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
    order: [
      ['id', 'ASC']
    ]
  }).then(data=>{
    // res.send(data)
    res.render('teacher.ejs', {teacher:data})
  }).catch(err=>{
    console.log(err)
  })
})

routes.post('/', (req, res) => {
  // console.log(req.body);
  Models.Teacher.create(req.body)
    .then(data => {
      res.redirect('/teacher')
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports = routes;