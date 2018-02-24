const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
     offset = ((page - 1) * 10)  + 1;
  }
  model.Student.findAndCountAll({
    limit : 10,
    offset: offset,
    order : [['firstName','ASC']],
    include: [{model : model.Subject}]
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
  let alertMessage = req.flash('alertMessage');
  let alertStatus = req.flash('alertStatus');
  let alert = { message: alertMessage, status: alertStatus};
  let data = {
    firstName: req.flash('firstName'),
    lastName: req.flash('lastName'),
    email: req.flash('email')
  };
  res.render('students/create',{alert: alert, data: data});
});

router.post('/create', (req, res) => {

  model.Student.build(req.body).save().then(() => {

    req.flash('alertMessage', 'Succes Add New Student');
    req.flash('alertStatus', 'success');
    res.redirect('/students');

  }).catch((err) => {

    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('firstName',req.body.firstName);
    req.flash('lastName',req.body.lastName);
    req.flash('email',req.body.email);
    res.redirect('/students/create');

  });
});
router.get('/edit/:id', (req, res) => {

  model.Student.findById(req.params.id).then((student) => {
    let alertMessage = req.flash('alertMessage');
    let alertStatus = req.flash('alertStatus');
    let alert = { message: alertMessage, status: alertStatus};
    let data = {
      firstName: req.flash('firstName'),
      lastName: req.flash('lastName'),
      email: req.flash('email')
    };
    res.render('students/edit',{student:student,alert: alert, data: data});

  }).catch((err) => {

    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');

  })
});
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  model.Student.findById(id).then((student) => {
    return student.update(req.body);
  }).then(() => {
      req.flash('alertMessage', `Succes Update A Student with id ${id}`);
      req.flash('alertStatus', 'success');
      res.redirect('/students');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('firstName',req.body.firstName);
    req.flash('lastName',req.body.lastName);
    req.flash('email',req.body.email);
    res.redirect(`/students/edit/${id}`);
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
router.get('/:id/subject', (req, res) => {
  let id = req.params.id;
  model.Student.findById(id).then((student) => {
    model.Subject.all().then((subjects) => {
      res.render('students/subject',{student: student,subjects: subjects});
    });
  });
});

router.post('/:id/subject', (req, res) => {
  let id = req.params.id;
  model.StudentSubject
    .build({ StudentId: id, SubjectId: req.body.SubjectId})
    .save()
    .then(() => {
    req.flash('alertMessage', `Succes Add Subject To Student with id ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/students');
  }).catch((err) => {
    req.flash('alertMessage', `Something went Wrong :  ${err}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/students');
  });
});

module.exports = router;
