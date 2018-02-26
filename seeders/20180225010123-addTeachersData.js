'use strict';
const fs = require('fs');
var teachers = fs.readFileSync('./teachers.csv','utf8').split('\n');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arrayOfTeachers = [];
    for(let i=1;i<teachers.length-1;i++){
      let teacher = teachers[i].split(',');
      let first = teacher[0];
      let last = teacher[1];
      let imel = teacher[2];
      let waktuSekarang = new Date();
      let updateNanti = new Date();
      arrayOfTeachers.push({first_name:first,last_name:last,createdAt:waktuSekarang,
        updatedAt:updateNanti,email:imel});
    }
    return queryInterface.bulkInsert('Teachers',arrayOfTeachers,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers',null,{});
  }
};
