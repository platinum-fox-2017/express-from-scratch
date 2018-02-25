'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher),
    Subject.belongsToMany(models.Student, {through: models.StudentsSubject})
  };
  return Subject;
};