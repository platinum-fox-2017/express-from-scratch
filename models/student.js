'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "email format is incorrect"
        }
      }
    }
  }, {});
  Student.associate = function (models) {
    // associations can be defined here
    models.Student.belongsToMany(models.Subject, { through: 'StudentSubjects', foreignKey: 'studentId' })
  };
  return Student;
};