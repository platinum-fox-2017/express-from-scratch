'use strict';
module.exports = (sequelize, DataTypes) => {
  var Students = sequelize.define('Students', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Students.associate = models=>{
    Students.belongsToMany(models.Subject,{
      through:'Score',
      foreignKey:'id_student'
    })
  }
  return Students;
};
