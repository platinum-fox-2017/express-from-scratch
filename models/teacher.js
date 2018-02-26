'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  Teacher.prototype.fullName = function(){
    return this.dataValues['First Name']+' '+this.dataValues['Last Name']
  }

  Teacher.associate = function(db) {
    // associations can be defined here
    Teacher.belongsTo(db.Subject, {foreignKey:'SubjectId'})
  };
  return Teacher;
};
