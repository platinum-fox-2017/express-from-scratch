'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher, {foreignKey: 'subjectId'})
    Subject.belongsToMany(models.Student, {
      through: 'StudentsSubjects',
      foreignKey: 'studentId',
      otherKey: 'subjectId'
    })
  };
  return Subject;
};
