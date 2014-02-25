
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

var Moniker = require('moniker');

exports.addUser = function(users) {
  var user = {
    username: Moniker.choose(),
    correct: 0
  }

  users.push(user);
  return user;
}

exports.removeUser = function(currentUser, users) {
  for (var i = users.length - 1; i >= 0; i--) {
    if (currentUser === users[i]) {
      users.splice(i, 1);
      return;
    }
  }
}

