const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
     offset = ((page - 1) * 10)  + 1;
  }
  model.Student.findAndCountAll({
    raw: true,
    limit : 10,
    offset: offset,
    order : [['id','DESC']]
  }).then((students) => {
    let alertMessage = req.flash('alertMessage');
    let alertStatus = req.flash('alertStatus');
    let alert = { message: alertMessage, status: alertStatus};
    let totalPage = Math.round(students.count / 10);
    let pagination = {totalPage : totalPage, currentPage: page};
    res.render('students/index',{students: students.rows,alert: alert,pagination: pagination});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');
  })
});

router.get('/create', (req, res) => {
  res.render('students/create');
});
router.post('/create', (req, res) => {

  model.Student.build(req.body).save().then(() => {
    req.flash('alertMessage', 'Succes Add New Student');
    req.flash('alertStatus', 'success');
    res.redirect('/students');
  });
});
router.get('/edit/:id', (req, res) => {
  model.Student.findById(req.params.id).then((student) => {
    res.render('students/edit',{student:student});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');
  })
});
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  model.Student.findById(id).then((student) => {
    student.update(req.body).then(() => {
      req.flash('alertMessage', `Succes Update A Student with id ${id}`);
      req.flash('alertStatus', 'success');
      res.redirect('/students');
    })
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');
  })
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  model.Student.findById(id).then((student) => {
    return student.destroy();
  }).then(() => {
    req.flash('alertMessage', `Succes Delete A Student with id ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/students');
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');
  });
});

module.exports = router;
