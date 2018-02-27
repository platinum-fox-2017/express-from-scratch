'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "Email is incorrect!"
            }
        }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {through: models.SubjectStudent});
    Student.hasMany(models.SubjectStudent);
  };

  Student.prototype.fullname = function() {
      return this.first_name + " " + this.last_name;
  }
  return Student;
};
