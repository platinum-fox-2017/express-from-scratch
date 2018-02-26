'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    score: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(db) {
    db.StudentSubject.belongsTo(db.Student, {foreignKey:'StudentId'})
    db.StudentSubject.belongsTo(db.Subject, {foreignKey:'SubjectId'})

  };
  return StudentSubject;
};
