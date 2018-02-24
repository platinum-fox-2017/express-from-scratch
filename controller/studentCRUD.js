'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js')

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
  static addStudent(options){
    db.Student.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newStudent => {
      View.displayAddData(newStudent);
    });
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

  static updateStudent(options){
    db.Student.findOne({
      where:{id:options[0]}
    }).then(foundStudent => {
      let updateData = {};
      updateData[options[1]] = options[2];
      foundStudent.update(updateData);
      View.displayUpdate(foundStudent);
    });
  }

  static deleteStudent(options){
    db.Student.findOne({
      where:{id:options[0]}
    }).then(foundStudent => {
      View.displayDestroyed(foundStudent);
      return foundStudent.destroy();
    });
  }

}

module.exports = Student;
