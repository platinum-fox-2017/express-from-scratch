'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject_student = sequelize.define('subject_student', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  subject_student.associate = function(models) {
    subject_student.belongsTo(models.Subject, {foreignKey: 'subjectId'})
    subject_student.belongsTo(models.Student, {foreignKey: 'studentId'})
  }
  return subject_student;
};