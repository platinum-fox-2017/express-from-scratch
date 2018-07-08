'use strict';
const fs = require('fs');
var students = fs.readFileSync('./students.csv','utf8').split('\n');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrayOfStudents = [];
    for(let i=1;i<students.length-1;i++){
      let student = students[i].split(',');
      let first = student[0];
      let second = student[1];
      let imel = student[2];
      let waktuSekarang = new Date();
      let updateNanti = new Date();
      arrayOfStudents.push({first_name:first,last_name:second,email:imel,
        createdAt:waktuSekarang,updatedAt:updateNanti});
    }
    return queryInterface.bulkInsert('Students',arrayOfStudents,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students',null,{});
  }
};
