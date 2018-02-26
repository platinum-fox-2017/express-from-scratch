'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "email format is incorrect"
        }
      }
    },
    id_subject: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {
      through: 'subject_student' ,
      foreignKey: 'id_student',
      otherKey: 'id_subject'
    })
  };
  return Student;
};
