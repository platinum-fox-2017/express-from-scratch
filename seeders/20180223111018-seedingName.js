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

  //  return queryInterface.bulkInsert('Students', [{
  //   first_name: 'Akbar',
  //   last_name: 'Sahata',
  //   email: 'akbarsahata@gmail.com',
  //   createdAt: new Date (),
  //   updatedAt: new Date ()
  // },
  // {
  //   first_name: 'Orang',
  //   last_name: 'Biasa',
  //   email: 'orangbiasa@gmail.com',
  //   createdAt: new Date (),
  //   updatedAt: new Date ()
  // },
  // {
  //   first_name: 'Kevin',
  //   last_name: 'Himawan',
  //   email: 'kevinhimawan@gmail.com',
  //   createdAt: new Date (),
  //   updatedAt: new Date ()
  // },
  // {
  //   first_name: 'Agni',
  //   last_name: 'Rheza',
  //   email: 'agnirheza@gmail.com',
  //   createdAt: new Date (),
  //   updatedAt: new Date ()
  // }]);
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
