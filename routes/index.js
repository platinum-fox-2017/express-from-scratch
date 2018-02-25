const routes = require('express').Router()

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })

routes.get('/', (req, res) => {
  res.render('index.ejs')
})

module.exports = routes;