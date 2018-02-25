'use strict'
const view = require('../views')
const model = require('../models')
const express = require('express')

class Controller{
  static readTeacher(respond) {
    model.Teacher.findAll({
      attributes: ['id', ['first_name', 'First Name'], ['last_name', 'Last Name'], ['email', 'Email']],
      raw:true,
      }).then(projects => {
      // projects will be an array of all Project instances
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
    // console.log(request);
    // console.log(table);
    // console.log(keys);
    let obj = {}
    for(let i=0; i<keys.length; i++) {
      obj[keys[i]] = request[keys[i]]
    }    
    // console.log(obj)
    
    model[table].create(obj).then(projects => {
      view.printData(projects, table)
    });
  }

  static updateData(respond, idRequest, table) {
  let obj = {}
      obj.idRequest = idRequest
      view.editView(respond, idRequest, table)
      // model.Contact.update(objContact, {where:{id: option[0]}}).then(projects => {
      //   view.updateData('Contact', option, projects)
      // });
  }

  static deleteData(request, table) {
    model[table].destroy({where:{id: request}}).then(projects => {
      view.printData(projects, table)
    }); 
  }

  
  
  static homePage(respond) {
    view.homePage(respond);
  }
}

module.exports = Controller;
