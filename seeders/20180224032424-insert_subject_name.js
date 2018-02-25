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
    return queryInterface.bulkInsert('Subjects', [
      {
      subject_name: 'NodeJS',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'AJAX',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'ReactJS',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'VueJS',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'AngularJS',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'Sketch',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'Data Learning',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'Deep Learning',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'JAVA',
      createdAt: new Date,
      updatedAt: new Date
      }, 
      {
      subject_name: 'GUSTAFJS',
      createdAt: new Date,
      updatedAt: new Date
      }, 
    ], {});
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
