const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
     offset = ((page - 1) * 10)  + 1;
  }
  model.Subject.findAndCountAll({
    limit : 10,
    offset: offset,
    order : [['id','DESC']],
    include: [{ model: model.Teacher}]
  }).then((subjects) => {
    let alertMessage = req.flash('alertMessage');
    let alertStatus = req.flash('alertStatus');
    let alert = { message: alertMessage, status: alertStatus};
    let totalPage = Math.round(subjects.count / 10);
    let pagination = {totalPage : totalPage, currentPage: page};
    res.render('subjects/index',{subjects: subjects.rows,alert: alert,pagination: pagination});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/subjects');
  })
});

router.get('/create', (req, res) => {
  res.render('subjects/create');
});
router.post('/create', (req, res) => {

  model.Subject.build(req.body).save().then(() => {
    req.flash('alertMessage', 'Succes Add New Subject');
    req.flash('alertStatus', 'success');
    res.redirect('/subjects');
  });
});
router.get('/edit/:id', (req, res) => {
  model.Subject.findById(req.params.id).then((subject) => {
    res.render('subjects/edit',{subject:subject});
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/subjects');
  })
});
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  model.Subject.findById(id).then((subject) => {
    subject.update(req.body).then(() => {
      req.flash('alertMessage', `Succes Update A Subject with id ${id}`);
      req.flash('alertStatus', 'success');
      res.redirect('/subjects');
    })
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/subjects');
  })
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  model.Subject.findById(id).then((subject) => {
    return subject.destroy();
  }).then(() => {
    req.flash('alertMessage', `Succes Delete A Subject with id ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/subjects');
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/subjects');
  });
});
router.get('/:id/give-score', (req, res) => {
  let id = req.params.id;
  model.StudentSubject.findOne({
    attributes: ['id'],
    where : {
    id: id
  }, include: [{ model: model.Student},{ model: model.Subject}]}).then((score) => {
    res.render('subjects/givescore',{score: score});
  });

});
router.post('/:id/give-score', (req, res) => {
  let id = req.params.id;
  model.StudentSubject.findOne({where : {
    id: id
  }, include: [{ model: model.Student},{ model: model.Subject}]}).then((score) => {
    return score.update(req.body);
  }).then((score) => {
    req.flash('alertMessage', `Succes Add Score To Student's Subject`);
    req.flash('alertStatus', 'success');
    res.redirect(`/subjects/${score.Subject.id}/enrolled-students`);
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect(`/subjects/${score.Subject.id}/enrolled-students`);
  });

});
router.get('/:id/enrolled-students', (req, res) => {
  let id = req.params.id;
  let alertMessage = req.flash('alertMessage');
  let alertStatus = req.flash('alertStatus');
  let alert = { message: alertMessage, status: alertStatus};
  model.StudentSubject.all({
    attributes: ['id','score'],
    where: {
    SubjectId: id
    },
    include : [{ model: model.Student},{model: model.Subject}],
    order: [[model.Student,'firstName','ASC']]
  }).then((studentSubjects) => {
    res.render('subjects/students',{students: studentSubjects,alert:alert});
  });

});

module.exports = router;
