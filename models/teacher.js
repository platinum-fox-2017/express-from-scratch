'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate :{
        isEmail: {
          args: true,
          msg: 'Format email harus sesuai'
        }
      }
    },
    subjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    models.Teacher.belongsTo(models.Subject, {foreignKey: 'subjectId'})
  };
  return Teacher;
};
