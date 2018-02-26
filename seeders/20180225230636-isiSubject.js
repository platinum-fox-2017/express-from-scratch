'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
    {
      name: 'Kimia',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Ekonomi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subject', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
      return queryInterface.bulkDelete('Subject', null, {});
  }
};
