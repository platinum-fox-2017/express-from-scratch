const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
     offset = ((page - 1) * 10)  + 1;
  }
  model.Teacher.findAndCountAll({
    raw: true,
    limit : 10,
    offset: offset,
    order : [['id','DESC']]
  }).then((teachers) => {
    let alertMessage = req.flash('alertMessage');
    let alertStatus = req.flash('alertStatus');
    let alert = { message: alertMessage, status: alertStatus};
    let totalPage = Math.round(teachers.count / 10);
    let pagination = {totalPage : totalPage, currentPage: page};
    res.render('teachers/index',{teachers: teachers.rows,alert: alert,pagination: pagination});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/teachers');
  })
});

router.get('/create', (req, res) => {
  res.render('teachers/create');
});
router.post('/create', (req, res) => {

  model.Teacher.build(req.body).save().then(() => {
    req.flash('alertMessage', 'Succes Add New Teacher');
    req.flash('alertStatus', 'success');
    res.redirect('/teachers');
  });
});
router.get('/edit/:id', (req, res) => {
  model.Teacher.findById(req.params.id).then((teacher) => {
    res.render('teachers/edit',{teacher:teacher});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/teachers');
  })
});
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  model.Teacher.findById(id).then((teacher) => {
    teacher.update(req.body).then(() => {
      req.flash('alertMessage', `Succes Update A Teacher with id ${id}`);
      req.flash('alertStatus', 'success');
      res.redirect('/teachers');
    })
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/teachers');
  })
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  model.Teacher.findById(id).then((teacher) => {
    return teacher.destroy();
  }).then(() => {
    req.flash('alertMessage', `Succes Delete A Teacher with id ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/teachers');
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/teachers');
  });
});

module.exports = router;
