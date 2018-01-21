
var count=0;
// var  TARGET = [1,2,5,3,8,6,7,4] // N개 순서뒤섞여있음.
//     ,Y      = [1,2,5,3,8,6,7,4] // N개 순서뒤섞여있음.
var  TARGET = 'abcdefc' // N개 순서뒤섞여있음.
    ,Y      = 'edafe' // Target에 대한 최대부분문자열.
    ,trace  = []
    ,memo  = [];

var t_lastIndex = TARGET.length -1
   ,y_lastIndex = Y.length - 1;

var result = LIS(t_lastIndex, y_lastIndex);
//
console.log('result',result);
console.log('cache',  memo);
console.log('trace',trace);
console.log('count',count);


//

function LIS(t_lastIndex, y_lastIndex) {
  ++count;
  if( t_lastIndex < 0 || y_lastIndex < 0) return 0; // 같은것이 없다면... 길이0.
  // console.log(t_lastIndex, ' : ', y_lastIndex)

   var t_lastValue  = TARGET[t_lastIndex]
   var y_lastValue  = Y[y_lastIndex]

  if(t_lastValue == y_lastValue) { 
          var prevTY_LIS = LIS(t_lastIndex-1, y_lastIndex-1);
          var curTY_LIS  = prevTY_LIS + 1;
          return curTY_LIS;
  };

  if(t_lastValue != y_lastValue) {
     var prevT_LIS = LIS(t_lastIndex-1, y_lastIndex)
     var prevY_LIS = LIS(t_lastIndex, y_lastIndex-1)
          
     if(prevT_LIS >= prevY_LIS) {
         return prevT_LIS
     } else {
         return prevY_LIS
     }
  };  
}

function cache(a,b,value) {
  cache[a] = cache[a] || []
  cache[a][b] = value; 
}
function getCache(a,b) {
  return cache[a][b];
}

