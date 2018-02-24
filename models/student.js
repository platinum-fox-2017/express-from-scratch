'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = models=>{
    Student.belongsToMany(models.Subject,{
      through:'score',
      foreignKey:'id_student'
    })
  }
  Student.prototype.fullName =(first_name, last_name)=>{
    return `${first_name} ${last_name}`
  }
  return Student;
};