'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  });
   

  Subjects.associate = models => {
 //M:M <Subjects --- Subjects_Students --- Students>
    Subjects.belongsToMany(models.Students, {
      through: "Subjects_Students",
      foreignKey: "subject_id",
    })
//1:M <Subjects --- Teachers>
    Subjects.hasMany(models.Teachers, {
      foreignKey: "subject"
})

  }
  return Subjects;
};