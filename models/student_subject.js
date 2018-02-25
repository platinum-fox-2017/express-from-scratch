'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student_subject = sequelize.define('Student_subject', {
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER
  });

  Student_subject.associate = function(models){
    Student_subject.belongsTo(models.Student,{foreignKey: 'id_student'})
    Student_subject.belongsTo(models.Subject,{foreignKey: 'id_subject'})
  };
  return Student_subject;
};