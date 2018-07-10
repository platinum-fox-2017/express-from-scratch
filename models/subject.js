'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    TeachersId: DataTypes.INTEGER
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher);
    Subject.hasMany(models.StudentSubject);
    Subject.belongsToMany(models.Student, {through: models.StudentSubject})
  };
  return Subject;
};