'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      name: 'Deva',
      gender: 'male',
      age: '22',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Cecha',
      gender: 'male',
      age: '25',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dhiar',
      gender: 'male',
      age: '26',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Andrew',
      gender: 'male',
      age: '25',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
