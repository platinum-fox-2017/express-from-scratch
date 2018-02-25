'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  });
  Subjects.associate = models => {
    Subjects.hasMany(models.Teachers, {
      foreignKey: "subject_id"
    })
  }
  Subjects.associate = models => {
    Subjects.belongsToMany(models.Students, {
      through: "Subjects_Students",
      foreignKey: "subject_id",
    })
  }
  return Subjects;
};