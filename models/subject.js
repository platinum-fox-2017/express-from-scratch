'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {
      foreignKey: 'id_subject'
    })

    Subject.belongsToMany(models.Student, { through: models.StudentSubject, foreignKey: 'id_subject'});
    Subject.hasMany(models.StudentSubject,{
      foreignKey: 'id_subject'
    })


  };
  return Subject;
};
