'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    // associations can be defined here
    models.Subject.hasMany(models.Teacher, { foreignKey: 'subjectId' })
    models.Subject.belongsToMany(models.Student, { through: 'StudentSubjects', foreignKey: 'subjectId' })
  };
  return Subject;
};