'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:DataTypes.STRING,
  }, {});

  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
  };

  Teacher.prototype.fullName =(first_name, last_name)=>{
    return `${first_name} ${last_name}`
  }

  return Teacher;
};