'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    name: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    Subject.hasMany(models.Teachers,{
      foreignKey:'id_subject'
    })
    Subject.belongsToMany(models.Students,{
      through:'Score',
      foreignKey:'id_student'
    })
  };
  return Subject;
};
