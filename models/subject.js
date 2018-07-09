'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject = sequelize.define('subject', {
    subject_name: DataTypes.STRING
  }, {});
  subject.associate = function(models) {
    subject.belongsToMany(models.student,{through:models.studentsubject, foreignKey: 'subject_id'})
    subject.hasMany(models.studentsubject,{ foreignKey: 'subject_id'})
  };
  return subject;
};
