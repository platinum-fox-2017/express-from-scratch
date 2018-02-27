'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students',[{
      first_name: 'Deva',
      last_name: 'Mahendra',
      email: 'devdots@msn.com'
    }])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Students', null, {});
  }
};
