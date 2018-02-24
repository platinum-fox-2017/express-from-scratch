'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = function (models){
    Subject.hasMany(models.Teacher,{
      foreignKey: 'subjectId'
    })

    Subject.hasMany(models.subject_student,{
      foreignKey: 'subjectId'
    })

    Subject.belongsToMany(models.Student,{
      foreignKey: 'subjectId',
      through: 'subject_student'
    })
  }
  return Subject;
};