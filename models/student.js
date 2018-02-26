'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
    Student.hasMany(models.StudentSubject)
    // associations can be defined here
  };

  Student.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`
  }
  return Student;
};