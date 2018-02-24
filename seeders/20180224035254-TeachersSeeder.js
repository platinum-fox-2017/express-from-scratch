'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let teachers = [];
    for (var i = 0; i < 10; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let email = faker.internet.email();
      teachers.push({
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    }
    return queryInterface.bulkInsert('Teachers', teachers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};