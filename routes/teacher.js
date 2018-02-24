const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  model.Teacher.all({
    raw: true
  }).then((teachers) => {
    res.render('teachers',{teachers: teachers});
  })
});


module.exports = router;
