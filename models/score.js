'use strict';
module.exports = (sequelize, DataTypes) => {
  var score = sequelize.define('score', {
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER,
    score:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: {
          args:true,
          msg :'score yang input harus menggunakan angka'
        }
      }
    } 
  }, {});
  score.associate = models=>{
    score.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
    score.belongsTo(models.Student,{
      foreignKey:'id_student'
    })
  }
  return score;
};