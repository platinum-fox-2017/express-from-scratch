'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: {
      type:DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i']
      }
    }
  }, {});
  Subject.associate = function(db) {
    // associations can be defined here
    Subject.hasMany(db.Teacher, {foreignKey:'SubjectId'})
    Subject.belongsToMany(db.Student, {through: 'StudentSubject', foreignKey:'SubjectId'})
    Subject.hasMany(db.StudentSubject)
  };
  return Subject;
};
