'use strict';

const models = require('../models');

const getDataSubject = callback => {
  models.Subject.findAll({ raw: true })
    .then(subjects => callback(subjects))
    .catch(error => console.log(error));
}

module.exports = {
    showAll(req, res) {
      return models.Student
        .findAll()
      	.then(student => {
          // student.forEach(row => console.log(row.getFullname()));
          res.status(201).render('./pages/student/list_student.ejs', { data: student })
        })
       	.catch(error => res.status(400).send(error));
    },

    showEditForm(req, res) {
      return models.Student
          .findById(req.params.id, { raw: true })
          .then(student => res.status(201).render('./pages/student/edit_student.ejs', { data: student, message: null }))
          .catch(error => res.status(400).send(error));
    },

    create(req, res) {
      return models.Student
          .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          })
          .then(student => res.status(201).render('./pages/student/add_student.ejs', { message: `Data ${student.first_name} ${student.last_name} berhasil ditambahkan` }))
          .catch(error => res.status(400).render('./pages/student/add_student.ejs', { message: error }));
    },

    update(req, res) {
      return models.Student
        .update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
        }, { 
          where: { id: req.params.id }
        })
          .then(result => res.status(201).render('./pages/student/edit_student.ejs', {
            data: { id: req.params.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
              },
            message: `Data telah diupdate` }))
          .catch(error => res.status(400).render('./pages/student/edit_student.ejs', { message: error }));
    },

    destroy(req, res) {
      return models.Student
        .destroy({ 
          where: { id: req.params.id }
        })
        .then(result => res.status(201).redirect('/students/'))
          .catch(error => res.status(400).send(error));
    },

    showAddForm(req, res) {
      res.status(200).render('./pages/student/add_student.ejs', { message: null })
    },

    showAddSubjectForm(req, res) {
      return models.Student
          .findById(req.params.id, { include: models.Subject })
          .then(student => {
            console.log(student.Subjects.length);
            getDataSubject(subject => {
              res.status(201).render('./pages/student/add_subject_to_student.ejs', { dataStudent: student, dataSubject: subject, message: null })
            })
          })
          .catch(error => res.status(400).send(error));
    },

    addSubject(req, res) {
      return models.StudentSubject
        .create({
          StudentId: req.params.id,
          SubjectId: req.body.subject
        })
        .then(result => res.status(201).redirect(`/students/${req.params.id}/addsubject`))
        .catch(error => res.status(400).send(error));
        // .then(student => res.status(201).render('./pages/student/add_student.ejs', { message: `Data ${student.first_name} ${student.last_name} berhasil ditambahkan` }))
        // .catch(error => res.status(400).render('./pages/student/add_teacher.ejs', { message: error }));
    }
};