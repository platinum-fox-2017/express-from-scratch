'use strict';
const Op = require('sequelize').Op

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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
          Teacher.findAll({
            where:{
              email:value,
              id: { [Op.ne]: this.id,}
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
    id_subject:DataTypes.INTEGER,
  }, {});

  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
  };

  Teacher.prototype.getFullName =function(){
    return `${this.first_name} ${this.last_name}`
  }

  return Teacher;
};