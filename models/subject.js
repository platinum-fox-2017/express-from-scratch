'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = function(models){
    Subject.hasMany(models.Teacher,{foreignKey: 'id_subject'})
    Subject.belongsToMany(models.Student,{through :models.Student_subject,foreignKey: 'id_subject'})
  };
  

  return Subject;
};