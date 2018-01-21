// 알고 수열문제.


var startTime;
//  
var rl = require('readline').createInterface(process.stdin, {});
var inputCount = 0
  , inputLength
  , numChars;

rl.on('line', function(line) {
    if(!startTime) startTime = Date.now();

	  ++inputCount;
    if(inputCount == 1) numChars   = line;
    if(inputCount == 2) inputLength = Number(line);
    if(inputCount>2) Main(line);

    if(inputLength && ((inputLength +2) == inputCount)) {
      console.log(Date.now()- startTime)
      rl.close();
    }
})

rl.emit('line','1111000000000000011111111111111111111111111')
rl.emit('line','2')
rl.emit('line','1 5')
rl.emit('line','5 15')

///
function Main(input) {
		var fAndL    = input.replace(/ /g,'')
		   ,firstLoc = Number(fAndL[0])
		   ,lastLoc  = Number(fAndL[1])
           ,firstNum = numChars[firstLoc]
           ,lastNum  = numChars[lastLoc];

        if(firstNum == lastNum) console.log('Yes');
       	else					console.log('No');
}