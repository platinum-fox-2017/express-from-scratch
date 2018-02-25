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
    // console.log(foundDatas[0].dataValues);
    let props = Object.getOwnPropertyNames(foundDatas[0].dataValues);
    // console.log(props);
    // let rawData = foundDatas
    let path = tableName.toLowerCase();
    res.render('tableStudent.ejs', {
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
    res.render('tableTeacher.ejs', {
      title: tableName,
      h1: tableName,
      heads: props,
      foundDatas: foundDatas,
      newData: newData,
      method: method,
      path: path
    })
  }


  static redirect(res, route){
    res.redirect(route);
  }

  // for (let i = 0; i < teachers.length; i++) {
  //   <tr>
  //   for (var j = 0; j < teachers[i].dataValues.length; j++) {
  //     <td><%= teachers[i].dataValues[j] %></td>
  //   }
  //   </tr>
  // }



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
