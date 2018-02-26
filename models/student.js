'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate :{
        isEmail: {
          args: true,
          msg: 'Format email harus sesuai'
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {
      through: 'StudentsSubjects',
      foreignKey: 'subjectId',
      otherKey: 'studentId'
    })
    Student.prototype.getFullname = function() {
      return this.first_name+' '+this.last_name
    }
  };
  return Student;
};
