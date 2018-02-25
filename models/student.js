'use strict';
module.exports = (sequelize, DataTypes) => {
  var student = sequelize.define('student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  })

  student.associate = function(models){
    student.hasMany(models.subject_student,{foreignKey:'id_student'})

    student.belongsToMany(models.subject,{
      through : 'subject_student',
      foreignKey :'id_student'
    })

  }
  return student;
};