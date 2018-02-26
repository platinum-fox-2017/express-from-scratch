'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js');


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
  static addTeacher(options, res){
    db.Teacher.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newTeacher => {
      if (res) {
        Teacher.tableResponse(res, newTeacher, 'added');
      } else {
        View.displayAddData(newTeacher);
      }
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

  static updateTeacher(options, res){
    db.Teacher.findOne({
      where:{id:options[0]}
    }).then(foundTeacher => {
      if (res) {
        let updateData = {
          first_name: options[1],
          last_name: options[2],
          email: options[3]
        };
        foundTeacher.update(updateData).then(()=>{
          View.redirect(res, '/teachers')
        });
      } else {
        let updateData = {};
        updateData[options[1]] = options[2];
        foundTeacher.update(updateData);
        View.displayUpdate(foundTeacher);
      }
    });
  }

  static deleteTeacher(options, res){
    db.Teacher.findOne({
      where:{id:options[0]}
    }).then(foundTeacher => {
      if (res) {
        return foundTeacher.destroy().then(()=>{
          View.redirect(res, '/teachers')
        });
      } else {
        View.displayDestroyed(foundTeacher);
        return foundTeacher.destroy();
      }

    });
  }

  // display table
  static tableResponse(res, newData, method){
    db.Teacher.findAll({
      // attributes
      include:[{
        model: db.Subject,
        attributes: [['subject_name', 'Subject Name']]
      }],
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], 'email'],
      order: [['first_name', 'ASC']]
    }).then(foundTeachers => {
      View.displayTeacherTable(res, foundTeachers, 'Teachers', newData, method);
    });
  }

}

module.exports = Teacher;
