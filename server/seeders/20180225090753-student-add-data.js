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
   return queryInterface.bulkInsert('Students', [{
    first_name: 'Wika',
    last_name: 'Silo',
    email: 'wikasilo@sekolah.id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    first_name: 'budi',
    last_name: 'anto',
    email: 'budianto@sekolah.id',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Students', null, {}); 
  }
};
