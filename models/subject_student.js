'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject_student = sequelize.define('subject_student', {
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER,
    score     : DataTypes.INTEGER
  })
  subject_student.associate = function(models){
    subject_student.belongsTo(models.subject,{foreignKey:'id_subject'})
    subject_student.belongsTo(models.student,{foreignKey:'id_student'})
  }
  return subject_student;
};