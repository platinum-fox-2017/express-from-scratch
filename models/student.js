'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  Student.prototype.fullName = function(){
    return this.dataValues['First Name']+' '+this.dataValues['Last Name']
  }


  Student.associate = function(db) {
    // associations can be defined here
    Student.belongsToMany(db.Subject, {through: 'StudentSubject', foreignKey:'StudentId'})
    Student.hasMany(db.StudentSubject);
  };
  return Student;
};
