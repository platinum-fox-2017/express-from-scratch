'use strict';
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
      validate: {
        isUnique: ((value, next) => {
          Student.findAll({
            where: {
              email: value,
              id: { [Op.ne]: this.id }
            }
          }).then(data => {
            if (data.length === 0) {
              next()
            } else {
              next('Email address already in used');
            }
          }).catch(err => {
            next(err)
          })
        }),
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

    Student.prototype.getFullName = function () {
      return (this.first_name + ' ' + this.last_name)
    }
  };


  return Student;
};