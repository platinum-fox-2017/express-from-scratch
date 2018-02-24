'use strict'
const db = require('../models/index.js');
const View = require('../views/index.js')

class User {
  constructor() {

  }

  static readCommands(argv){
    // node app.js <tableName> <command> <options>
    let target = argv[2];
    let command = argv[3];
    let options = argv.slice(4);

    if (target.toLowerCase() == "users") {
      switch (command.toLowerCase()) {
        case 'add':
          User.addUser(options);
          break;
        case 'read':
          User.readUser(options);
          break;
        case 'update':
          User.updateUser(options);
          break;
        case 'delete':
          User.deleteUser(options);
          break;
        default: console.log('command invalid');

      }
    } else {
      console.log('target invalid');
    }
  }

  // CRUD
  static addUser(options){
    db.User.create({
      first_name: options[0],
      last_name: options[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      email: options[2]
    }).then(newUser => {
      View.displayAddData(newUser);
    });
  }

  static readUser(options){
    if (options[0]) {
      db.User.findOne({
        where:{
          id: options[0]
        }
      }).then(foundUser => {
        View.displayOneFound(foundUser);
      });
    } else {
      db.User.findAll({
        // attributes
      }).then(foundUsers => {
        View.displayManyFound(foundUsers);
      });
    }
  }

  static updateUser(options){
    db.User.findOne({
      where:{id:options[0]}
    }).then(foundUser => {
      let updateData = {};
      updateData[options[1]] = options[2];
      foundUser.update(updateData);
      View.displayUpdate(foundUser);
    });
  }

  static deleteUser(options){
    db.User.findOne({
      where:{id:options[0]}
    }).then(foundUser => {
      View.displayDestroyed(foundUser);
      return foundUser.destroy();
    });
  }

}

module.exports = User;
