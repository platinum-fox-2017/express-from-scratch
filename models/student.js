'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  Student.associate = models => {
    Student.belongsToMany(models.Subject,{
      through: 'student_subject_detail',
      foreignKey: 'studentId'
    })
  }
  return Student;
};
