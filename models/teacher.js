'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validation: {
        isEmail:true,
        // isUnique : function(value, next) {
          
        //   if (value) {
        //     Teacher.findAll({
        //           where : {
        //               email: value
        //           }
        //       }).success(function(user) {
        //         console.log(user)
        //           // if (user) {
        //           //     next('Already taken')
        //           // } else {
        //           //     next()
        //           // }
        //       }).error(function(err) {
        //           next(err.message);
        //       });
        //   } else {
        //       next("String is empty");
        //   }
        // }
      }
    },
    subjectId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Teacher.associate = function (models){
    Teacher.belongsTo(models.Subject,{
      foreignKey: 'subjectId'
    })
  }

  Teacher.getAll = function(models){
    return new Promise((resolve,reject)=>{
      this.findAll({include:['Subject']}).then(result=>{
        resolve(result)
      })
    })
  }
  return Teacher;
};