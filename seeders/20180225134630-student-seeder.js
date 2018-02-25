'use strict';

const fs = require('fs');

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
    let data = fs.readFileSync('./student.csv', 'UTF-8');
    let dataArr = data.trim().split('\n')
    let arrOfObj = [];
    for(let i=1; i<dataArr.length; i++){
      let row = dataArr[i].split(',');
      let obj = {
        name: row[0],
        email: row[1],
        phone: row[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      arrOfObj.push(obj);
    }

    return queryInterface.bulkInsert('Students', arrOfObj, {});
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
