'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
    Student.hasMany(models.StudentSubject);
  };
  return Student;
};