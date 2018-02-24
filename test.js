// const fs = require('fs');
// let teachersFile = fs.readFileSync('./teachers.csv','utf8').split('\r\n');

// let arrObjTeachers = [];
// for (let i = 0; i < teachersFile.length; i++) {
//     let objTeachers = {};
//     objTeachers['first_name'] = teachersFile[i].split(',')[1]
//     objTeachers['last_name'] = teachersFile[i].split(',')[2]
//     objTeachers['email'] = teachersFile[i].split(',')[3]
//     arrObjTeachers.push(objTeachers);
// }

// // let splitFile = teachersFile[0].split(',')
// // console.log(teachersFile[0].split(',')[1]); // 4
// console.log(arrObjTeachers);

const models = require('./models');

models.Teacher.findAll({raw:true}).then(projects => {
    // projects will be an array of all Project instances
    console.log(projects);
})