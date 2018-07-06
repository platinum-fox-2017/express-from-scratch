'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacher = sequelize.define('teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subjects: DataTypes.STRING,
    id_subject : DataTypes.INTEGER
  })
  teacher.associate = function (models) {
    teacher.belongsTo(models.subject,{foreignKey:'id_subject'})
  }
  return teacher;
};