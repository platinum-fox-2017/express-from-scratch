'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        unique: true,
      }
    }
  }, {});

  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, { through: models.StudentSubject});
    Student.hasMany(models.StudentSubject);
  };

  Student.prototype.getFullname = function() {
    // console.log(this);
    return this.first_name + ' ' + this.last_name;
  };

  return Student;
};