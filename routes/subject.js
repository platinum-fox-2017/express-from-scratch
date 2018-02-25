const express = require('express')
const router = express.Router()
const {subject,teacher} = require('../models')


router.get('/',(req,res)=>{
    subject.findAll({include:teacher}).then(data=>{
        res.render('subject.ejs',{data:data})
    }).catch(err=>{
        res.send(err)
    })    
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    subject.destroy({where:{id:id}}).then(data=>{
        res.redirect('/subject')
    })
})

module.exports = router