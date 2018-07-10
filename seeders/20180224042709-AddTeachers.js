'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    
    const fs = require('fs');
    let teachersFile = fs.readFileSync('./teachers.csv','utf8').split('\r\n');
   
    let arrObjTeachers = [];
    for (let i = 0; i < teachersFile.length; i++) {
      let objTeachers = {};
      objTeachers['first_name'] = teachersFile[i].split(',')[1]
      objTeachers['last_name'] = teachersFile[i].split(',')[2]
      objTeachers['createdAt'] = new Date();
      objTeachers['updatedAt'] = new Date();
      objTeachers['email'] = teachersFile[i].split(',')[3]
      arrObjTeachers.push(objTeachers)
    }
    return queryInterface.bulkInsert('Teachers', arrObjTeachers, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
