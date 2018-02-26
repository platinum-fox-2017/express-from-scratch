'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teachers = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.INTEGER,
  });
  // 1:M <Subjects --- Teachers>
  Teachers.associate = models => {
    Teachers.belongsTo(models.Subjects, {
      foreignKey: "subject",
    })
  }
  return Teachers;
};