'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js');
const express = require('express');

class Student {
  constructor() {

  }

  static readCommands(argv){
    // node app.js <tableName> <command> <options>
    let target = argv[2];
    let command = argv[3];
    let options = argv.slice(4);

    if (target.toLowerCase() == "students") {
      switch (command.toLowerCase()) {
        case 'add':
          Student.addStudent(options);
          break;
        case 'read':
          Student.readStudent(options);
          break;
        case 'update':
          Student.updateStudent(options);
          break;
        case 'delete':
          Student.deleteStudent(options);
          break;
        default: console.log('command invalid');

      }
    } else {
      console.log('target invalid');
    }
  }

  // CRUD
  static addStudent(options, res){
    db.Student.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newStudent => {
      if (res) {
        Student.tableResponse(res, newStudent, 'added')
      } else {
        View.displayAddData(newStudent);
      }

    }).catch(err=>{
      console.log('-----',err.message);
    })
  }

  static readStudent(options){
    if (options[0]) {
      db.Student.findOne({
        where:{
          id: options[0]
        }
      }).then(foundStudent => {
        View.displayOneFound(foundStudent);
      });
    } else {
      db.Student.findAll({
        // attributes
      }).then(foundStudents => {
        View.displayManyFound(foundStudents);
      });
    }
  }

  static updateStudent(options, res){
    db.Student.findOne({
      where:{id:options[0]}
    }).then(foundStudent => {
      if (res) {
        let updateData = {
          first_name: options[1],
          last_name: options[2],
          email: options[3]
        };
        foundStudent.update(updateData).then(()=>{
          // Student.tableResponse(res, foundStudent, 'Edited')
          View.redirect(res, `/students`);
        });

      } else {
        let updateData = {};
        updateData[options[1]] = options[2];
        foundStudent.update(updateData).then(()=>{
          View.displayUpdate(foundStudent);
        });
      }
    });
  }

  static deleteStudent(options, res){
    db.Student.findOne({
      where:{id:options[0]}
    }).then(foundStudent => {
      if (res) {
        return foundStudent.destroy().then(()=>{
          View.redirect(res, '/students');
        })
      } else {
        View.displayDestroyed(foundStudent);
        return foundStudent.destroy();
      }
    });
  }

  // display table
  static tableResponse(res, newData, method){
    db.Student.findAll({
      include:[{
        model: db.Subject
      }],
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], 'email'],
      order:[['first_name', 'ASC']]
    }).then(foundStudents => {
      View.displayStudentTable(res, foundStudents, 'Students', newData, method);
    });
  }

  static showSubjectAddForm(id, res){


    db.Student.findOne({
      where:{id:id}
    }).then((foundStudent)=>{
      res.render('./students_view/formAddSubject.ejs',
      { title:'Edit Student',
        h1:'Add Subject to Student',
        id: id,
        path:'students',
        foundStudent:foundStudent
      })
    })
  }

  static updateSubject(studentData, StudentId, res){
    let Subject = studentData.Subject;
    db.Subject.findOne({
      where:{
        subject_name: Subject
      }
    }).then(foundSubject=>{
      db.StudentSubject.create({
        score: null,
        StudentId: StudentId,
        SubjectId: foundSubject.id
      }).then(newConjunct=>{
        View.redirect(res, '/students')
      })
    })
  }

}

module.exports = Student;
