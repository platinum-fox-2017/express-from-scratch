'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
    Student.hasMany(models.StudentSubject);
  };
  return Student;
};