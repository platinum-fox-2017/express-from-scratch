const getPredicate =(score)=>{
    if(score<=100 && score>80){
      return 'A'
    }else if(score<=80 && score>60){
      return 'B'
    }else if(score<=60 && score>40){
      return 'C'
    }else if(score<=40 && score>20){
      return 'D'
    }else{
      return 'E'
    }
}
module.exports = {getPredicate}