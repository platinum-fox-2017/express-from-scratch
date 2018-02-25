'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Teacher.associate = function(db) {
    // associations can be defined here
    Teacher.belongsTo(db.Subject)
  };
  return Teacher;
};
