'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is incorrect"
        },
      }
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: models.StudentsSubject})
  };

  Student.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  };
  return Student;
};