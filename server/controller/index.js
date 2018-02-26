'use strict'
const view = require('../views')
const model = require('../models')
const express = require('express')

class Controller{
  static readTeacher(respond) {
    model.Teacher.findAll({
      include: [{
        model:model.Subject,
        attributes: [['subject_name', '']],
        raw:true,
      }],
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], ['email', 'Email']],
      raw:true,
      }).then(projects => {
      // projects will be an array of all Project instances
      // projects = [projects.dataValues]
      view.printData(respond, projects, 'Teacher')
    })
  }

  static readSubject(respond) {
    model.Subject.findAll({
      attributes: ['id', ['subject_name', 'Subject Name']],
      raw:true,
      }).then(projects => {
      // projects will be an array of all Project instances
      view.printData(respond, projects, 'Subject')
    })
  }

  static readStudent(respond) {
    model.Student.findAll({
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], ['email', 'Email']],
      raw:true,
      }).then(projects => {
      // projects will be an array of all Project instances
      view.printData(respond, projects, 'Student')
    })
  }

  static addData(request, table) {
    let keys = Object.keys(request)
    let obj = {}
    for(let i=0; i<keys.length; i++) {
      obj[keys[i]] = request[keys[i]]
    }
    
    model[table].create(obj).then(projects => {
      view.printData(projects, table)
    });
  }

  static deleteData(request, table) {
    model[table].destroy({where:{id: request}}).then(projects => {
      view.printData(projects, table)
    }); 
  }

  static editSubject(respond, id, table) {
    let objId = {}
    objId.id = id

    model[table].findAll({
      attributes: ['id', ['subject_name', 'Subject Name']],
      raw:true,
      where: objId,
    })
    .then(data => {
      view.editView(respond, data, table)
    })
  }

  static editStudent(respond, id, table) {
    let objId = {}
    objId.id = id

    model[table].findAll({
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], ['email', 'Email']],
      raw:true,
      where: objId,
    })
    .then(data => {
      view.editView(respond, data, table)
    })
  }

  static editTeacher(respond, id, table) {
    let objId = {}
    objId.id = id

    model[table].findAll({
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], ['email', 'Email'], ['SubjectId', 'Subject ID']],
      raw:true,
      where: objId,
    })
    .then(data => {
      console.log('=============', data);
      view.editView(respond, data, table)
    })
  }

  static gantiData(respond, objUpdate, table) {
    // let key = Object.keys(objUpdate)
    // let obj = {}
    // for(let i-0; i<objUpdate.length; i++) {
    //   obj[key[i]] = objUpdate
    // }
    // obj.id = objUpdate.id
    // obj.subject_name = objUpdate.subject_name

    model[table].update(
      objUpdate,
      {where:
        {id: objUpdate.id}
      }).then(data => {
        console.log(objUpdate);
        
      view.printData(respond, data, table)
    }); 
  }

  static homePage(respond) {
    view.homePage(respond);
  }
}

module.exports = Controller;
