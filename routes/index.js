'use strict';

module.exports = (function() {
  // app.set('view engine', 'ejs')
    const externalRoutes = require('express').Router();
    const students = require('./students')
    externalRoutes.use('/students', students)

    externalRoutes.get('/', function (req, res) {
      res.render('index.ejs',{});
    });
    return externalRoutes;
})();
