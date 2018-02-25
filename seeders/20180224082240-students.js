'use strict';

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
    return queryInterface.bulkInsert('Students', [
      {
        first_name: 'Fransiskus',
        last_name: 'Teddy',
        email: 'work@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Sebastian',
        last_name: 'Sumali',
        email: 'newemail@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Wika',
        last_name: 'Silo',
        email: 'potato@potato.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Yohanes',
        last_name: 'Sahrul',
        email: 'coding@allday.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Students', {where:{}})
  }
};
