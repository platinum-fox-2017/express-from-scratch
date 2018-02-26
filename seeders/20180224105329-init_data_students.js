'use strict'

const fs = require('fs');
let students_data = fs.readFileSync('./students.csv','utf-8');
let array_of_students = [];
let object = {};
students_data = students_data.trim();
students_data = students_data.split('\n');
for(let i=1; i<students_data.length; i++){
  let students_data2 = students_data[i].split(',');
      object.first_name = students_data2[0];
      object.last_name = students_data2[1];
      object.email = students_data2[2];
      object.createdAt = new Date();
      object.updatedAt = new Date();
      array_of_students.push(object);
      object = {};
}
console.log('test');
console.log(array_of_students);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', array_of_students);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students',null,{});
  }
};
