let array = ['abcx', 'def', 'ghi'];
let processArray = [];
let result = [];
let maxLength = 0;
let arr = array.forEach(
  function (elem){
    let splitArray = elem.split('');
    processArray.push(splitArray);
    if(splitArray.length > maxLength){
      maxLength = splitArray.length;
    }
  }
);
for (let i = 0; i < maxLength; i ++){
  let str = '';
  processArray.forEach(
    function (elem){
      if(elem[i]){
        str += elem[i];
      }
    }
  );
  result.push(str);
}
console.log(result);

let n = 100;

function getNumber (index){
  let base = 1;
  if(index < 4){
    return base;
  } else {
    return getNumber(index - 1) + getNumber(index - 2) + getNumber(index - 3);
  }
}

console.log(getNumber(n));

// 斐波那契数列： 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

let n = 100;

let getNumber = function (index) {
  let base = 1;
  let sum = 0;
  while(index < 3){

  }
}

getNumber(n);
