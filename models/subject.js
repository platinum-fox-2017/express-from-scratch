'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  Subject.associate = models => {
    Subject.hasMany(models.Teacher,{
      foreignKey: 'subjectId'
    })
    Subject.belongsToMany(models.Student,{
      through: 'student_subject_detail',
      foreignKey: 'subjectId'
    })
  }
  return Subject;
};
