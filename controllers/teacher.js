'use strict';

const Teacher = require('../models').Teacher;
const Subject = require('../models').Subject;

const getDataSubject = callback => {
  Subject.findAll({ raw: true })
    .then(subjects => callback(subjects))
    .catch(error => console.log(error));
}

module.exports = {
  	showAll(req, res) {
    	return Teacher
      	  .findAll({ 
            include: Subject, 
            order: [ [ 'id', 'ASC' ] ],
            })
      	  .then(teacher => res.status(201).render('./pages/teacher/list_teacher.ejs', { data: teacher  }))
      	  .catch(error => res.status(400).send(error));
  	},

  	showEditForm(req, res) {
  		return Teacher
          .findById(req.params.id, { raw: true })
          .then(teacher => {
            getDataSubject(dataSubject => {
              res.status(201).render('./pages/teacher/edit_teacher.ejs', { dataTeacher: teacher, dataSubject: dataSubject, message: null })
            })
          })
          .catch(error => res.status(400).send(error));
    },

    create(req, res) {
    	return Teacher
          .create({
            first_name: req.body.first_name,
          	last_name: req.body.last_name,
          	email: req.body.email,
          })
          .then(teacher => res.status(201).render('./pages/teacher/add_teacher.ejs', { message: `Data ${teacher.first_name} ${teacher.last_name} berhasil ditambahkan` }))
          .catch(error => res.status(400).render('./pages/teacher/add_teacher.ejs', { message: error }));
    },

    update(req, res) {
      	return Teacher
      	  .update({
      	  	first_name: req.body.first_name,
          	last_name: req.body.last_name,
          	email: req.body.email,
            SubjectId: req.body.subject
          }, { 
          	where: { id: req.params.id }
          })
          // .then(result => res.status(201).render('./pages/teacher/edit_teacher.ejs', {
          // 	dataTeacher: { 
          //       id: req.params.id,
          // 			first_name: req.body.first_name,
          // 			last_name: req.body.last_name,
          // 			email: req.body.email,
          //       SubjectId: req.body.subject
          // 		},
          // 	message: `Data telah diupdate` }))
          .then(result => res.status(201).redirect('/teachers/'))
          .catch(error => res.status(400).render('./pages/teacher/edit_teacher.ejs', { message: error }));
    },

    destroy(req, res) {
		return Teacher
          .destroy({ 
          	where: { id: req.params.id }
          })
          .then(result => res.status(201).redirect('/teachers/'))
          .catch(error => res.status(400).send(error));
    },

    showAddForm(req, res) {
    	res.status(200).render('./pages/teacher/add_teacher.ejs', { message: null })
    },
};