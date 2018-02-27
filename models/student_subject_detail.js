'use strict';
module.exports = (sequelize, DataTypes) => {
  var student_subject_detail = sequelize.define('student_subject_detail', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score    : DataTypes.INTEGER
  });
  student_subject_detail.associate = models => {
    student_subject_detail.belongsTo(models.Student,{
      foreignKey: 'studentId'
    })
    student_subject_detail.belongsTo(models.Subject,{
      foreignKey: 'subjectId'
    })
  }
  return student_subject_detail;
};
