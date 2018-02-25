'use strict';
module.exports = (sequelize, DataTypes) => {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  });
   //M:M <Subjects --- Subjects_Students --- Students>
  Students.associate = models => {
    Students.belongsToMany(models.Subjects, {
      through: "Subjects_Students",
      foreignKey: "student_id",
    })
    Students.hasMany(models.Subjects_Students, {
      foreignKey: "student_id",
    })
  }
  return Students;
};