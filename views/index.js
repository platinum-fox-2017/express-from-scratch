'use strict'
const express = require('express');


class View {
  constructor() {

  }

  static displayAddData(newData){
    console.log(newData.dataValues);
  }

  static displayOneFound(oneFound){
    console.log(oneFound.dataValues);
  }

  static displayManyFound(manyFound){
    console.log(manyFound.dataValues);
  }

  static displayUpdate(updatedData){
    console.log(updatedData.dataValues);
  }

  static displayDestroyed(destroyedData){
    console.log(destroyedData.dataValues);
  }

  //display table
  static displayTable(res, foundDatas, tableName, newData, method) {
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    let path = tableName.toLowerCase();
    res.render('table.ejs', {
      title: tableName,
      h1: tableName,
      heads: props,
      foundDatas: foundDatas,
      newData: newData,
      method: method,
      path: path
    })
  }

  static displayStudentTable(res, foundDatas, tableName, newData, method) {
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    let path = tableName.toLowerCase();
    res.render('./students_view/tableStudent.ejs', {
      title: tableName,
      h1: tableName,
      heads: props,
      foundDatas: foundDatas,
      newData: newData,
      method: method,
      path: path
    })
  }

  static displayTeacherTable(res, foundDatas, tableName, newData, method) {
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    let path = tableName.toLowerCase();
    res.render('./teachers_view/tableTeacher.ejs', {
      title: tableName,
      h1: tableName,
      heads: props,
      foundDatas: foundDatas,
      newData: newData,
      method: method,
      path: path
    })
  }

  static displaySubjectTable(res, foundDatas, tableName, newData, method) {
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    let path = tableName.toLowerCase();
    res.render('./subjects_view/tableSubject.ejs', {
      title: tableName,
      h1: tableName,
      heads: props,
      foundDatas: foundDatas,
      newData: newData,
      method: method,
      path: path
    })
  }

  static displayEnrolledStudents(res, foundSubject, tableName, subjectId){
    let path = tableName.toLowerCase()
    console.log(foundSubject);
    let params = {
      title: tableName,
      foundDatas: foundSubject.Students,
      StudentSubjects: foundSubject.StudentSubjects,
      subject_name:foundSubject.subject_name,
      path: path,
      subjectId:subjectId
    }
    res.render('./subjects_view/subjectStudentsList.ejs', params)
  }


  static redirect(res, route){
    res.redirect(route);
  }

}

module.exports = View;
