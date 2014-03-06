var user    = require('./user.js');
var users = []; // Users connected to server

// Randomized Math Problem
function getRandomInt(min, max) { //  Select random number for expression
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
      operator = operators[keys[keys.length * Math.random() << 0]]; // Select random operator.

  self.expression = x + operator + y; // Assigns expression as object property.
  self.solution = eval(self.expression); // Evaluates expression. Assigns as object property.
}

exports.initGame = function(server) {
  var io = require('socket.io').listen(server); // Socket.io

  // Create new Challenge object and emit to user.
  function mathProblem() {
    var challenge = new Challenge;
    console.log(challenge);
    io.sockets.emit('message', challenge.expression + '?');

    return challenge;
  }

  io.sockets.on('connection', function(socket) {
    var currentUser = user.addUser(users); // Create new user on new client connection.
    var challenge = mathProblem();

    // Emit initial game start.
    socket.emit('welcome', currentUser);
    io.sockets.emit('message', currentUser.username + ' joins the game.');
    io.sockets.emit('users', users);

    // When user submits answer, check submission and if correct emit new Challenge. If incorrect, emit only to user to try again.
    socket.on('send', function(answer) {
      if (answer == String(challenge.solution)) {
        user.gainPoint(currentUser);
        io.sockets.emit('message', currentUser.username + ' answered correctly with ' + answer + '.');
        io.sockets.emit('users', users);
        mathProblem();
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
