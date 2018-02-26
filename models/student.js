'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{args:true,
        msg:'Email format is incorrect!'},
        isUnique :((value,next)=>{
          Student.findAll({where:{
            email:value,
            id:{[Op.ne]: this.id}}})
            .then(data=>{
            if(data.length === 0){
              next()
            }else{
              next('Email address already in used'); 
            }
          }).catch(err=>{
            console.log(err)
          })
        })
      }
    }
  });
  
  Student.associate = function(models){
    Student.belongsToMany(models.Subject,{through :models.Student_subject,foreignKey: 'id_student'})
  };
  Student.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`
  }
  return Student;
};