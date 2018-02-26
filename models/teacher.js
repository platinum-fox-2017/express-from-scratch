'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};