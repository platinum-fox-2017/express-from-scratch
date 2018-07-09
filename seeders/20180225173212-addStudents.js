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
    first_name: 'Akbar',
    last_name: 'Sahata',
    email: 'akbarsahata@student.ac.id',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    first_name: 'Michio',
    last_name: 'Kaku',
    email: 'michiokaku@student.ac.id',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
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
