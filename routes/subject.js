const routes = require('express').Router()
const Models = require('../models')

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })
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
    order: [
      ['id', 'ASC']
    ]
  }).then(data=>{
    // res.send(data)
    res.render('subject.ejs', {subject:data})
  }).catch(err=>{
    console.log(err)
  })
})

routes.post('/', (req, res) => {
  // console.log(req.body);
  Models.Subject.create(req.body)
    .then(data => {
      res.redirect('/subject')
    })
    .catch(err=>{
      console.log(err)
    })
})


module.exports = routes;