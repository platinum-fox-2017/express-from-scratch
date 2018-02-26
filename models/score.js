'use strict';
module.exports = (sequelize, DataTypes) => {
  var Score = sequelize.define('Score', {
    score: DataTypes.INTEGER,
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER
  }, {});
  Score.associate = models=>{
    Score.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
    Score.belongsTo(models.Students,{
      foreignKey:'id_student'
    })
  }
  return Score;
};
