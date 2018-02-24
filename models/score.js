'use strict';
module.exports = (sequelize, DataTypes) => {
  var score = sequelize.define('score', {
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  score.associate = models=>{
    score.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
    score.belongsTo(models.Student,{
      foreignKey:'id_student'
    })
  }
  score.prototype.description=(score)=>{
    if(score<=100 && score>80){
      return 'A'
    }else if(score<=80 && score>60){
      return 'B'
    }else if(score<=60 && score>40){
      return 'C'
    }else if(score<=40 && score>20){
      return 'D'
    }else{
      return 'E'
    }
  }
  return score;
};