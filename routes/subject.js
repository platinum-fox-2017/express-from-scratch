const express = require('express')
const app = express()

const models = require('../models')
let router = express.Router();

router.get('/', function (req, res) {
  models.Subject.findAll().then(detail=>{
    res.render('subject',{data:detail})
  }).catch(err=>{
    console.log(err)
  })
  
})

module.exports = router