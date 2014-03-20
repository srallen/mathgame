var user    = require('./user.js');
var users = []; // Users connected to server
var challengeAry = []; // Array to store what the current challenge is and re-emit it for new users if it is not answered.

// Randomized Math Problem
function getRandomInt(min, max) { //  Select random number for expression
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Challenge = function() {
  var self = this,
      x    = getRandomInt(1, 100),
      y    = getRandomInt(1, 100),
      operators = {
          'add': ' + ',
          'subtract': ' - ',
          'multiply': ' * '
        },
      keys = Object.keys(operators),
      operator = operators[keys[keys.length * Math.random() << 0]]; // Select random operator.

  self.expression = x + operator + y; // Assigns expression as object property.
  self.solution = eval(self.expression); // Evaluates expression. Assigns as object property.
}

exports.initGame = function(server) {
  var io = require('socket.io').listen(server); // Socket.io

  // Create new Challenge object and emit to user.
  function mathProblem(ary) {
    var challenge = new Challenge;
    console.log('new challenge:');
    console.log(challenge);
    io.sockets.emit('message', challenge.expression + '?');

    challengeAry.push(challenge);
    console.log('new challenge array:');
    console.log(challengeAry);
    return challenge;
  }

  io.sockets.on('connection', function(socket) {
    var currentUser = user.addUser(users); // Create new user on new client connection.

    if (challengeAry.length == 1) {
      currentChallenge = challengeAry[0];
      socket.emit('message', currentChallenge.expression + '?');
    } else {
      currentChallenge = mathProblem(challengeAry);
    }

    // Emit initial game start.
    socket.emit('welcome', currentUser);
    io.sockets.emit('message', currentUser.username + ' joins the game.');
    user.orderUsers(users);
    io.sockets.emit('users', users);

    // When user submits answer, check submission and if correct emit new Challenge. If incorrect, emit only to user to try again.
    socket.on('send', function(answer) {
      console.log(answer + ' received.')
      console.log('Array before conditional:')
      console.log(challengeAry);
      console.log('Checking var before conditional:')
      console.log(currentChallenge);
      if (answer == currentChallenge.solution) {
        user.gainPoint(currentUser);
        user.orderUsers(users);
        io.sockets.emit('message', currentUser.username + ' answered correctly with ' + answer + '.');
        io.sockets.emit('users', users);
        challengeAry = [];
        console.log('Confirmed empty array.')
        console.log(challengeAry);
        currentChallenge = mathProblem(challengeAry);
      } else {
        socket.emit('message', 'Please try again.');
      }
    });

    // On client disconnect, emit to other users that user has disconnected and update user list.
    socket.on('disconnect', function() {
      socket.broadcast.emit('message', currentUser.username + ' leaves the game.');
      user.removeUser(currentUser, users);
      socket.broadcast.emit('users', users)
    });
  });
}
