'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject_student = sequelize.define('subject_student', {
    id_subject: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  subject_student.associate = function(models) {
    subject_student.belongsTo(models.Subject, {
      foreignKey: 'id_subject'
    })
    subject_student.belongsTo(models.Student, {
      foreignKey: 'id_student'
    })
  }
  return subject_student;
};
