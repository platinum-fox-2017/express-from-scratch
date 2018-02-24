'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js')

class Teacher {
  constructor() {

  }

  static readCommands(argv){
    // node app.js <tableName> <command> <options>
    let target = argv[2];
    let command = argv[3];
    let options = argv.slice(4);

    if (target.toLowerCase() == "teachers") {
      switch (command.toLowerCase()) {
        case 'add':
          Teacher.addTeacher(options);
          break;
        case 'read':
          Teacher.readTeacher(options);
          break;
        case 'update':
          Teacher.updateTeacher(options);
          break;
        case 'delete':
          Teacher.deleteTeacher(options);
          break;
        default: console.log('command invalid');

      }
    } else {
      console.log('target invalid');
    }
  }

  // CRUD
  static addTeacher(options){
    db.Teacher.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newTeacher => {
      View.displayAddData(newTeacher);
    });
  }

  static readTeacher(options){
    if (options[0]) {
      db.Teacher.findOne({
        where:{
          id: options[0]
        }
      }).then(foundTeacher => {
        View.displayOneFound(foundTeacher);
      });
    } else {
      db.Teacher.findAll({
        // attributes
      }).then(foundTeachers => {
        View.displayManyFound(foundTeachers);
      });
    }
  }

  static updateTeacher(options){
    db.Teacher.findOne({
      where:{id:options[0]}
    }).then(foundTeacher => {
      let updateData = {};
      updateData[options[1]] = options[2];
      foundTeacher.update(updateData);
      View.displayUpdate(foundTeacher);
    });
  }

  static deleteTeacher(options){
    db.Teacher.findOne({
      where:{id:options[0]}
    }).then(foundTeacher => {
      View.displayDestroyed(foundTeacher);
      return foundTeacher.destroy();
    });
  }

}

module.exports = Teacher;
