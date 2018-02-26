'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    id_subject: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  SubjectStudent.associate = function(models) {
    SubjectStudent.belongsTo(models.Student, {foreignKey: 'id_student'})
    SubjectStudent.belongsTo(models.Subject, {foreignKey: 'id_subject'})
  };
  return SubjectStudent;
};