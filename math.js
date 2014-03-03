// Randomized Math Problem
var io = require('socket.io').listen(server);

//  Select random number for expression
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Challenge = function() {
  var self = this,
      x = getRandomInt(1, 100),
      y = getRandomInt(1, 100),
      operators = {
          'add': ' + ',
          'subtract': ' - ',
          'multiply': ' * '
        },
      keys = Object.keys(operators),
      operator = operators[keys[ keys.length * Math.random() << 0]]; // Select random operator.

  self.expression = x + operator + y; // Assigns expression as object property.
  self.solution = eval(self.expression); // Evaluates expression. Assigns as object property.
}

exports.randomMath = function() {
  var challenge = new Challenge;
  io.sockets.emit('message', challenge.expression + '?');

  return challenge;
}

exports.checkAnswer = function(submission, challenge) {
  if (submission == String(challenge.solution)) {
    var challenge = new Challenge;
    console.log(challenge);

    io.sockets.emit('message', challenge.expression + '?');

    return challenge;
  }
}
