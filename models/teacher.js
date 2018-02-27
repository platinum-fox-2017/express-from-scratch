'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  });
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId'
    })
  }
  return Teacher;
};