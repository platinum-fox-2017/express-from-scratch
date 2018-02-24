'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js')

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
  static addSubject(options){
    db.Subject.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newSubject => {
      View.displayAddData(newSubject);
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

  static updateSubject(options){
    db.Subject.findOne({
      where:{id:options[0]}
    }).then(foundSubject => {
      let updateData = {};
      updateData[options[1]] = options[2];
      foundSubject.update(updateData);
      View.displayUpdate(foundSubject);
    });
  }

  static deleteSubject(options){
    db.Subject.findOne({
      where:{id:options[0]}
    }).then(foundSubject => {
      View.displayDestroyed(foundSubject);
      return foundSubject.destroy();
    });
  }

}

module.exports = Subject;
