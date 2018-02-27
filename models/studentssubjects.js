'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentsSubjects = sequelize.define('StudentsSubjects', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  StudentsSubjects.associate = function(models) {
    StudentsSubjects.belongsTo(models.Student, {foreignKey: 'studentId'})
    StudentsSubjects.belongsTo(models.Subject, {foreignKey: 'subjectId'})
  };
  return StudentsSubjects;
};
