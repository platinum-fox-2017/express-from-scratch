const routes = require('express').Router()
const model = require('../models')


routes.get('/', function(request, response){
    model.Subject.findAll({
        order: [['id','ASC']]
      })
      .then(subject => {
        response.render('listSubject',{data_subject:subject});
        // response.send(subject)
      });
});


module.exports = routes