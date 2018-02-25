'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(db) {
    // associations can be defined here
    Student.belongsToMany(db.Subject, {through: 'StudentSubject'})
  };
  return Student;
};
