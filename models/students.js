'use strict';
module.exports = (sequelize, DataTypes) => {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: (value,next) => {
          Students.findAll({
            where: {
              email: value,
            }
          })
          .then((data) => {
            if(data.length === 0) next();
            else next(`Email is already taken`);
          })
        }
      }
    }
  });
  //  M:M <Subjects --- Subjects_Students --- Students>
  Students.associate = models => {
    Students.belongsToMany(models.Subjects, {
      through: "Subjects_Students",
      foreignKey: "student_id",
    })
  }

  Students.prototype.full_name = function(){
    return `${this.first_name} ${this.last_name}`;
  }

  return Students;
};


