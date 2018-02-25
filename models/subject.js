'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(db) {
    // associations can be defined here
    Subject.hasMany(db.Teacher)
    Subject.belongsToMany(db.Student, {through: 'StudentSubject'})
  };
  return Subject;
};
