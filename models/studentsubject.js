'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {

    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  };
  StudentSubject.prototype.alphabetScore = function () {

    if (this.score > 90) {
      return 'A';
    } else if (this.score <= 90 && this.score > 80) {

      return 'B';
    } else if (this.score <= 80 && this.score > 70) {

      return 'C';
    } else if (this.score <= 70 && this.score > 50) {

      return 'D';
    } else if (this.score <= 50 ) {
      return 'E';
    }
  };
  return StudentSubject;
};
