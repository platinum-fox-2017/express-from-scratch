'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teachers = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject_id: DataTypes.STRING,
  });
  Teachers.associate = models => {
    Teachers.belongsTo(models.Subjects, {
      foreignKey: "subject_id",
    })
  }
  return Teachers;
};