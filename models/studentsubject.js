'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    subjectId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function (models) {
    // associations can be defined here
    models.StudentSubject.belongsTo(models.Subject, { foreignKey: 'subjectId' })
    models.StudentSubject.belongsTo(models.Student, { foreignKey: 'studentId' })
  };
  return StudentSubject;
};