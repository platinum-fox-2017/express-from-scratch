'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, { through: 'models.SubjectStudent', foreignKey: 'id_student' })
  };
  return Student;
};