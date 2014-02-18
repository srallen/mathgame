
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

var Moniker = require('moniker');
var users = [];

exports.addUser = function() {
  var user = {
    username: Moniker.choose(),
    correct: 0
  }

  users.push(user);
  // updateUserlist();
  return user;
}

exports.removeUser = function(currentUser) {
  for (var i = users.length - 1; i >= 0; i--) {
    if (currentUser.name === users[i].name) {
      users.splice(i, 1);
      return;
    };
  };
}


exports.userList = function() {
  var str = '';
  for (var i = users.length - 1; i >= 0; i--) {
    var user = users[i];
    str += "<li>" + user.username + ": " + user.correct + "</li>";
  };
  return str;
}
