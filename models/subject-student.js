'use strict';
module.exports = (sequelize, DataTypes) => {
  var subjectstudent = sequelize.define('subject-student', {
    id_subject: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER
  })
  
  return subjectstudent;
};