'use strict';
const faker = require('faker');

function generateData() {
  let arr = []
  for (let i = 0; i < 20; i++) {
    let obj = {
      name: faker.name.findName(),
      age: Math.ceil(Math.random() * 100),
      title: faker.name.title(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    arr.push(obj)
  }
  return arr
}

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
     return queryInterface.bulkInsert('Users', generateData(), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
