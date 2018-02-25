'use strict';
const faker = require('faker')

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
    let arrData = new Array()
    for (let i = 0; i < 20; i++) {
      var teacherObj = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
        email: faker.internet.email()
      }
      arrData.push(teacherObj)
    }

    return queryInterface.bulkInsert('Teachers', arrData, {});
   
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
