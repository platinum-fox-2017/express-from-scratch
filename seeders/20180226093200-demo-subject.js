'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [{
      name: 'Turbo Pascal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        name: 'Phyton',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'JavaScript',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Ruby',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Front-End',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Back-End',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'FullStack',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
