'use strict'

const fs = require('fs');
let teachers_data = fs.readFileSync('./teachers.csv','utf-8');
let array_of_teachers = [];
let object = {};
teachers_data = teachers_data.trim();
teachers_data = teachers_data.split('\n');
for(let i=1; i<teachers_data.length; i++){
  let teachers_data2 = teachers_data[i].split(',');
      object.first_name = teachers_data2[0];
      object.last_name = teachers_data2[1];
      object.email = teachers_data2[2];
      object.createdAt = new Date();
      object.updatedAt = new Date();
      array_of_teachers.push(object);
      object = {};
}
console.log(array_of_teachers);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', array_of_teachers);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers',null);
  }
};
