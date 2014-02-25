window.onload = function() {
  var server = io.connect('http://localhost:3000');
  var welcome = document.getElementById('welcome');
  var users = document.getElementById('users');
  var chat = document.getElementById('chat');

  server.on('welcome', function(data) {
    welcome.innerHTML += "<h2>Welcome, " + data.username + "</h2>";
  });

  server.on('users', function(data) {
    var str = '';
    for (var i = data.length - 1; i >= 0; i--) {
      var user = data[i];
      str += "<li>" + user.username + ": " + user.correct + "</li>";
    };

    users.innerHTML = "<ul>" + str + "</ul>";
  });

  server.on('join_message', function(data) {
    chat.innerHTML += "<p>" + data + " joins the game.</p>";
  });

  server.on('leave_message', function(data) {
    chat.innerHTML += "<p>" + data + " leaves the game.</p>";
  });
}
