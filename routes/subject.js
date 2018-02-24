const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  model.Subject.all({
    raw: true
  }).then((subjects) => {
    res.render('subjects',{subjects: subjects});
  })
});


module.exports = router;
