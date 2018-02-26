'use strict';

const fs = require('fs');
let subjects_data = fs.readFileSync('./subjects.csv','utf-8');
console.log(subjects_data);
let array_of_subjects = [];
let object = {};
subjects_data = subjects_data.trim();
subjects_data = subjects_data.split('\n');
for(let i=0; i<subjects_data.length; i++){
  console.log(subjects_data[i]);
  if(i !== 0){
    object.subject_name = subjects_data[i];
    object.createdAt = new Date();
    object.updatedAt = new Date();
    array_of_subjects.push(object);
  }
object ={};
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', array_of_subjects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null);
  }
};