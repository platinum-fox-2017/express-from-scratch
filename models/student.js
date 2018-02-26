'use strict';
module.exports = (sequelize, DataTypes) => {
  var student = sequelize.define('student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  student.associate = function(models) {
      student.belongsToMany(models.subject,{through:models.studentsubject,foreignKey: 'student_id'})
      student.hasMany(models.studentsubject,{ foreignKey: 'student_id'})
  };
  return student;
};
