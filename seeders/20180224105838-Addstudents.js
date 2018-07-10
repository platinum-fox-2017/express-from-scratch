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
   let studentsFile = fs.readFileSync('./students.csv','utf8').split('\r\n');
  
   let arrObjStudents = [];
   for (let i = 0; i < studentsFile.length; i++) {
     let objStudents = {};
     objStudents['first_name'] = studentsFile[i].split(',')[1]
     objStudents['last_name'] = studentsFile[i].split(',')[2]
     objStudents['email'] = studentsFile[i].split(',')[3]
     objStudents['createdAt'] = new Date();
     objStudents['updatedAt'] = new Date();
     arrObjStudents.push(objStudents)
   }
   return queryInterface.bulkInsert('Students', arrObjStudents, {});

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
