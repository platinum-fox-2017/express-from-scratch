'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg: "Tidak bisa kosong"
        }
      } 
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: "Format email salah"
        }
      }
    }
  });

  Student.associate = function (models){
    Student.belongsToMany(models.Subject,{
      through: 'subject_student',
      foreignKey: 'studentId'
    })

    Student.hasMany(models.subject_student,{
      foreignKey: 'studentId'
    })
  }
  return Student;
};