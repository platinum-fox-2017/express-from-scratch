'use strict';
const faker = require('faker')

let arr = []
for(let i=0;i<15;i++){
  let obj = {
    first_name:faker.name.firstName(),
    last_name:faker.name.lastName(),
    email:faker.internet.email(),
    createdAt:new Date(),
    updatedAt:new Date()
  }
  arr.push(obj)
}

console.log(arr);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkInsert('Teachers', arr, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
