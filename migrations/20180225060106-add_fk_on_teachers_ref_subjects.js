'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Teachers','subject_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Teachers','subject_id',null);
  }
};
