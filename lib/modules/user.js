// Require Moniker module.
var Moniker = require('moniker');

// Add user on client connection.
exports.addUser = function(users) {
  var user = {
    username: Moniker.choose(), // Randomize username.
    correct: 0 // Default number for points.
  }

  users.push(user); // Add to user list.
  return user;
}

// Gain point when user submits correct answer.
exports.gainPoint = function(currentUser) {
  currentUser.correct += 1;
  return currentUser;
}

exports.orderUsers = function(users) {
  for (var i = users.length - 1; i >= 0; i--) {
    var user = users[i];
    if (user.correct > 0) {
      users.sort(function(a,b){return a.value - b.value})
      return users;
      console.log('ordered users')
    }
  };
}

// Remove user from user list when client disconnects.
exports.removeUser = function(currentUser, users) {
  for (var i = users.length - 1; i >= 0; i--) {
    if (currentUser === users[i]) {
      users.splice(i, 1);
      return;
    }
  }
}
