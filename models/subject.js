'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    id_student: DataTypes.INTEGER

  }, {});
  Subject.associate = function(models) {
    Subject.belongsToMany(models.Student, {
      through: 'subject_student',
      foreignKey: 'id_subject',
      otherKey: 'id_student'
    })
    Subject.hasMany(models.Teacher, {
      foreignKey: 'id_subject'
    })
  };
  return Subject;
};
