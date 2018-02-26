'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('StudentsSubjects', 'score', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('StudentsSubjects', 'score');
  }
};
