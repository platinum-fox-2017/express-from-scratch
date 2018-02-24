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
    let subjectsFile = fs.readFileSync('./subjects.csv','utf8').split('\r\n');
   
    let arrObjSubjects = [];
    for (let i = 0; i < subjectsFile.length; i++) {
      let objSubjects = {};
      objSubjects['subject_name'] = subjectsFile[i].split(',')[1]
      objSubjects['createdAt'] = new Date();
      objSubjects['updatedAt'] = new Date();
      arrObjSubjects.push(objSubjects)
    }
    return queryInterface.bulkInsert('Subjects', arrObjSubjects, {});

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
