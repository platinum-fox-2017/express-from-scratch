'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, { through: models.StudentSubject ,foreignKey: 'id_student'});
    Student.hasMany(models.StudentSubject,{
      foreignKey: 'id_student'
    })
  };
  return Student;
};
