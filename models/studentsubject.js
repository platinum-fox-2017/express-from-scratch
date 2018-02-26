'use strict';
module.exports = (sequelize, DataTypes) => {
  var studentsubject = sequelize.define('studentsubject', {
    subject_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    score:DataTypes.INTEGER
  }, {});
  studentsubject.associate = function(models) {
    studentsubject.belongsTo(models.subject, { foreignKey: 'subject_id'})
    studentsubject.belongsTo(models.student, { foreignKey: 'student_id'})

  };
  return studentsubject;
};
