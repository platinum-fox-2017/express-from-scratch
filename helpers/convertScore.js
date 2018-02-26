const convertScore = function(value){
  if(value >= 80){
    return 'A'
  }
  else if (value >= 70){
    return 'B'
  }
  else if(value >= 60){
    return 'C'
  }else{
    return 'D'
  }
}

module.exports = {convertScore}