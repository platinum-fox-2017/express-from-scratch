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
    // console.log(foundDatas[0].dataValues);
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    // console.log(props);
    // let rawData = foundDatas
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
    // console.log(foundDatas[0]);
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
    // console.log(foundDatas[0].dataValues);
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    // console.log(props);
    // let rawData = foundDatas
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
  // <ol>
  // <% for (let j = 0; j < foundDatas[i].Teachers.length; j++) { %>
  //   <li><%= foundDatas[i].Teachers[j].fullName() %></li>
  // <% } %>
  // </ol>


  // <% for (let i = 0; i < teachers.length; i++) { %>
  //   <tr>
  //   <% let datas = Object.values(teachers[i].dataValues) %>
  //   <% for (var j = 0; j < datas.length; j++) { %>
  //     <td><%= datas[j] %></td>
  //   <% } %>
  //   </tr>
  // <% } %>

  // <% if (title === 'Students') { %>
  //   <a href="/Students/add">
  //     <button type="button" name="button">
  //       Add Student
  //     </button>
  //   </a>
  // <% } %>

  // <% if (newData) { %>
  //   <% let info = `Added ${newData.first_name} ${newData.last_name} ${newData.email}` %>
  //   <h1><%= info %></h1>
  // <% } %>

}

module.exports = View;
