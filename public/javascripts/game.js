window.onload = function() {
  var server = io.connect('http://localhost:3000');
  var welcome = document.getElementById('welcome');
  var users = document.getElementById('users');

  server.on('welcome', function(data) {
    welcome.innerHTML += "<h2>Welcome, " + data.username + "</h2>";
  });

  server.on('users', function(data) {
    users.innerHTML = "<ul>" + data + "</ul>";
  });
}
