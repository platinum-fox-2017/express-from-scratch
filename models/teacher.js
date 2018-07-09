'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacher = sequelize.define('teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject_id : DataTypes.INTEGER
  }, {});
  teacher.associate = function(models) {
    teacher.belongsTo(models.subject, { foreignKey: 'subject_id'})
  };
  return teacher;
};
