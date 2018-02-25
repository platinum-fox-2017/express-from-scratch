'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects_Students = sequelize.define('Subjects_Students', {
    student_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
  Subjects_Students.associate = models => {
    Subjects_Students.belongsTo(models.Students, {
      foreignKey:"student_id",
    })
    Subjects_Students.belongsTo(models.Subjects, {
      foreignKey:"subject_id",
    })
  }
  return Subjects_Students;
};