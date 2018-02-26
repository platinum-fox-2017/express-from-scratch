'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teachers = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Teachers.associate = function (models) {
    Teachers.belongsTo(models.Subject,{
      foreignKey:'id_subject'
    })
  };
  Teachers.prototype.fullName = function(){
    return `${this.first_name} ${this.last_name}`
  }
  return Teachers;
};
