const express = require('express')
const app = express()

const models = require('../models')
let router = express.Router();

router.get('/', function (req, res) {
  models.Teacher.findAll().then(detail=>{
    res.render('teacher',{data:detail})
    // console.log(JSON.parse(JSON.stringify(detail)))
  }).catch(err=>{
    console.log(err)
  })
  
})

module.exports = router