'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isEmail : {
          args: true,
          msg: "Email format is incorrect",
        }
      }

    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject);
  };

  Teacher.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  };

  return Teacher;
};