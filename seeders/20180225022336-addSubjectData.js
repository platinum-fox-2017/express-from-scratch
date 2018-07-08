'use strict';
const fs = require('fs');
var subjects = fs.readFileSync('./subjects.csv','utf8').split('\n');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrayOfSubjects = [];
    for(let i=1;i<subjects.length-1;i++){
      let subj = subjects[i];
      let waktuSekarang = new Date();
      let updateNanti = new Date();
      arrayOfSubjects.push({subject_name:subj,createdAt:waktuSekarang,
        updatedAt:updateNanti});
    }
    return queryInterface.bulkInsert('Subjects',arrayOfSubjects,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects',null,{});
  }
};
