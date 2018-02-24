'use strict'

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

}

module.exports = View;
