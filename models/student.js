'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg : 'gunakan format email yang benar'
        },
        isUnique:(value, next)=>{
          Student.findAll({
            where:{
              email:value
            }
          }).then(data =>{
            if(data.length === 0){
              next()
            }else{
              next('email telah digunakan')
            }
          }).catch(err=>{
            nex(err)
          })
        }
      }
    },
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