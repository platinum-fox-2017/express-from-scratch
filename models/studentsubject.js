'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    id:{ type:DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    id_student: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Student,{foreignKey:'id_student'})
    StudentSubject.belongsTo(models.Subject,{foreignKey:'id_subject'})
  };
  return StudentSubject;
};
