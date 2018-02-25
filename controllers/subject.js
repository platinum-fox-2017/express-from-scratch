'use strict';

const models = require('../models');

module.exports = {
	showAll(req, res) {
    	return models.Subject
      	  .findAll({ 
            include: models.Teacher, 
            order: [ [ 'id', 'ASC' ] ],
            })
      	  .then(subject => {
            // subject.forEach(row => console.log(row.Teachers[0].last_name))
            res.status(201).render('./pages/subject/list_subject.ejs', { data: subject  })
          })
      	  .catch(error => res.status(400).send(error));
  	},

  	showWithStudent(req, res) {
    	return models.Subject
      	  .findById(req.params.id, { 
            // attributes: ['id']
            include: [{ 
              model: models.StudentSubject,
              attributes: ['id'],
              include: [{
                model: models.Student
              }]
            }],
            order: [ [ models.StudentSubject, models.Student, 'first_name', 'ASC' ], [ models.StudentSubject, models.Student, 'last_name', 'ASC' ] ],
          })
      	  .then(subject => {
            // subject.forEach(row => console.log(row))
            // subject.StudentSubjects.forEach(row => console.log(row))
            console.log(subject.StudentSubjects)
            // res.status(201).render('./pages/subject/list_subject.ejs', { data: subject  })
          })
      	  .catch(error => res.status(400).send(error));
  	},

    showStudent(req, res) {
      return models.Subject
        .findById(req.params.id, { 
            include: [{ 
              model: models.StudentSubject,
              attributes: ['id', 'score'],
              include: [{
                model: models.Student
              }]
            }],
            order: [ [ models.StudentSubject, models.Student, 'first_name', 'ASC' ], [ models.StudentSubject, models.Student, 'last_name', 'ASC' ] ],
          })
        .then(subject => res.status(201).render('./pages/subject/enrolled_student.ejs', { data: subject }))
        .catch(error => res.status(400).send(error));
    },

    showGiveScoreForm(req, res) {
      return models.StudentSubject
        .findAll({
            attributes: ['id'],
            include: [{ 
              model: models.Student,
            }, {
              model: models.Subject,
            }],
            where: { id: req.params.idScore }
          })
        .then(subject => {
          console.log(subject[0]);
          res.status(201).render('./pages/subject/give_score.ejs', { data: subject[0], id: req.params.id, idScore: req.params.idScore })
        })
        .catch(error => res.status(400).send(error));
    },

    giveScore(req, res) {
      return models.StudentSubject
          .update({
            score: req.body.score
          }, { 
            where: { id: req.params.idScore }
          })
          .then(result => res.status(201).redirect(`/subjects/${req.params.id}/enrolledstudents`))
          .catch(error => res.status(400).send(error));
    }
};