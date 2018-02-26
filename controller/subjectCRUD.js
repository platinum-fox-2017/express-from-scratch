'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js');
const express = require('express');

class Subject {
  constructor() {
  }

  static readCommands(argv){
    // node app.js <tableName> <command> <options>
    let target = argv[2];
    let command = argv[3];
    let options = argv.slice(4);

    if (target.toLowerCase() == "subjects") {
      switch (command.toLowerCase()) {
        case 'add':
          Subject.addSubject(options);
          break;
        case 'read':
          Subject.readSubject(options);
          break;
        case 'update':
          Subject.updateSubject(options);
          break;
        case 'delete':
          Subject.deleteSubject(options);
          break;
        default: console.log('command invalid');

      }
    } else {
      console.log('target invalid');
    }
  }

  // CRUD
  static addSubject(options, res){
    db.Subject.create({
      subject_name: options[0],
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(newSubject => {
      if (res) {
        Subject.tableResponse(res, newSubject, 'added')
      } else {
        View.displayAddData(newSubject);
      }

    });
  }

  static readSubject(options){
    if (options[0]) {
      db.Subject.findOne({
        where:{
          id: options[0]
        }
      }).then(foundSubject => {
        View.displayOneFound(foundSubject);
      });
    } else {
      db.Subject.findAll({
        // attributes
      }).then(foundSubjects => {
        View.displayManyFound(foundSubjects);
      });
    }
  }

  static updateSubject(options, res){
    db.Subject.findOne({
      where:{id:options[0]}
    }).then(foundSubject => {
      if (res) {
        let updateData = {
          subject_name: options[1]
        };
        foundSubject.update(updateData).then(()=>{
          View.redirect(res, '/subjects');
        })
      } else {
        let updateData = {};
        updateData[options[1]] = options[2];
        foundSubject.update(updateData);
        View.displayUpdate(foundSubject);
      }
    });
  }

  static deleteSubject(options, res){
    db.Subject.findOne({
      where:{id:options[0]}
    }).then(foundSubject => {
      if (res) {
        return foundSubject.destroy().then(()=>{
          View.redirect(res, '/subjects');
        });
      } else {
        View.displayDestroyed(foundSubject);
        return foundSubject.destroy();
      }
    });
  }


  // static tableResponse(res, newData, method){
  //   db.Subject.findAll({
  //     include:[{
  //       model: db.Teacher ,
  //       attributes: [['first_name', 'First Name'], ['last_name', 'Last Name']]
  //     }],
  //     attributes: ['id', ['subject_name', 'Subject Name']]
  //   }).then(foundSubjects => {
  //     View.displaySubjectTable(res, foundSubjects, 'Subjects', newData, method);
  //   });
  // }

  static tableResponse(req, res) {
    db.Subject.findAll({
      include:[{
        model: db.Teacher ,
        attributes: [['first_name', 'First Name'], ['last_name', 'Last Name']]
     }],
     attributes: ['id', ['subject_name', 'Subject Name']]
    }).then(foundSubjects => {
      let props = Object.getOwnPropertyNames(foundSubjects[0].dataValues);
      res.render('./subjects_view/tableSubject.ejs', {
        title: 'Subjects',
        h1: 'Subjects',
        heads: props,
        foundDatas: foundSubjects,
        newData: 'newData',
        method: 'method',
        path: 'subjects'
      })
    });
  }


  static form(req,res){
    res.render('form.ejs', {
      title:'Subject',
      h1:'Subject Data',
      path:'subjects',
      err: null
    })
  }

  static formPost(req,res){
    let subject_name = req.body.subject_name;
    db.Subject.create({
      subject_name: subject_name,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(newSubject => {
        Subject.tableResponse(req, res)
    }).catch(err=>{
      res.render('form.ejs', {
        title:'Subject',
        h1:'Subject Data',
        path:'subjects',
        err : err
      })
    })
  }

  static editSubject(req,res){
    let id = req.params.id
    res.render('formEdit.ejs', {
      title:'Edit Subject',
      h1:'Edit Subject Data',
      id: id,
      path:'subjects',
      err: null
    })
  }

  static editSubjectPost(req, res){
    let id = req.params.id
    let subject_name = req.body.subject_name;

    db.Subject.findOne({
      where:{
        id:id
      }
    }).then(foundSubject => {
      let updateData = {
        subject_name: subject_name
      };
      return foundSubject.update(updateData)
    }).then(()=>{
      res.redirect('/subjects');
    }).catch(err =>{
      res.render('formEdit.ejs', {
        title:'Edit Subject',
        h1:'Edit Subject Data',
        id: id,
        path:'subjects',
        err: err
      })
    });
  }

  static deleteSubjectWeb(req,res){
    let id = req.params.id
    db.Subject.findOne({
      where:{
        id:id
      }
    }).then(foundSubject => {
        return foundSubject.destroy()
    }).then(()=>{
      res.redirect('/subjects');
    });
  }

  static subjectStudentsList(req, res){
    let subjectId = req.params.subjectId
    db.Subject.findOne({
      where:{id:subjectId},
      include:[{
        model: db.Student,
        attributes: ['id',['first_name', 'First Name'], ['last_name', 'Last Name']]
      },
      {
        model: db.StudentSubject
      }]
    }).then(foundSubject=>{
      let params = {
        title: 'Subjects',
        foundDatas: foundSubject.Students,
        StudentSubjects: foundSubject.StudentSubjects,
        subject_name:foundSubject.subject_name,
        path: 'subjects',
        subjectId:subjectId
      }
      res.render('./subjects_view/subjectStudentsList.ejs', params)
    })
  }

  static giveScore(req, res){
    db.Student.findOne({
      where:{
        id:req.params.studentId
      },
      attributes:[
        'id',
        ['first_name', 'First Name'],
        ['last_name', 'Last Name']
      ]
    }).then(foundStudent => {
      let params = {
        subjectId: req.params.subjectId,
        studentId: req.params.studentId,
        foundStudent: foundStudent
      }
      res.render('./subjects_view/formGiveScore.ejs', params)
    })


  }

  static submitScore(req, res){
    db.StudentSubject.update(
      {
        score:req.body.score
      },
      {
        where:{
          SubjectId: req.params.subjectId,
          StudentId: req.params.studentId
      }
    }).then(()=>{
      res.redirect(`/subjects/${req.params.subjectId}/enrolledstudents`);
    })
  }

}

module.exports = Subject;
