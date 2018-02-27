'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  });
  Teacher.associate = models => {
    Teacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId'
    })
  }
  return Teacher;
};
