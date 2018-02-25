module.exports = (function() {
    'use strict';
    var externalRoutes = require('express').Router();
    externalRoutes.get('/', function (req, res) {
        var obj={
          title:'Hacktiv8 batch 16 lulus semua Amin',
          datamurid:req.params.namadepan
        }
        res.render('homepage',obj);
    });
    externalRoutes.get('/students', (req, res) => {
      res.render('student-form');
    });

    externalRoutes.post('/students', (req, res) => {
      res.render('students-hasil',req.body);
    });
    externalRoutes.get('/teachers', function (req, res) {
        var obj={
          guru:[[1,'irsyad','laki-laki','guru komputer'],
                [2,'pahlapi','laki-laki','guru matematika'],
                [3,'mas ryan','laki-laki','guru hacktiv8']]
        }
        res.render('teachers',obj);
    });

    return externalRoutes;
})();
