'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentsSubject = sequelize.define('StudentsSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  StudentsSubject.associate = function(models) {
  };
  return StudentsSubject;
};