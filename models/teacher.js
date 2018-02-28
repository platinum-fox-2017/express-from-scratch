'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
    // associations can be defined here
  };

  Teacher.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`
  }
  return Teacher;
};