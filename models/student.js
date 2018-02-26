'use strict';
module.exports = (sequelize, DataTypes) => {
  var student = sequelize.define('student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args: true,
          msg: `Format email salah`
        }
      }
    }
  })

  student.associate = function(models){
    student.hasMany(models.subject_student,{foreignKey:'id_student'})

    student.belongsToMany(models.subject,{
      through : 'subject_student',
      foreignKey :'id_student'
    })
  }

  student.prototype.fullname = function(){
    return `${this.first_name} ${this.last_name}`
  }

  return student;
};