'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject = sequelize.define('subject', {
    subject_name: DataTypes.STRING,
    teacher : DataTypes.STRING
  })
  subject.associate = function (models) {
    subject.hasMany(models.teacher,{foreignKey:'id_subject'})

    subject.belongsToMany(models.student,{
      through : 'subject_student',
      foreignKey:'id_subject'
    })
    
    subject.hasMany(models.subject_student,{foreignKey:'id_subject'})
  
  }
  return subject;
}