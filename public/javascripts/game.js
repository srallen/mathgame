window.onload = function() {
  var client = io.connect('http://localhost:3000'),
      welcome = document.getElementById('welcome'),
      users = document.getElementById('users'),
      chat = document.getElementById('chat'),
      form = document.getElementById('submission_form'),
      field = document.getElementById('submission_text'),
      submitButton = document.getElementById('submit');

  client.on('welcome', function(data) {
    welcome.innerHTML += "<h2>Welcome, " + data.username + "</h2>";
  });

  client.on('users', function(data) {
    var str = '';
    for (var i = data.length - 1; i >= 0; i--) {
      var user = data[i];
      str += "<li>" + user.username + ": " + user.correct + "</li>";
    };

    users.innerHTML = "<ul>" + str + "</ul>";
  });

  client.on('message', function(data) {
    chat.innerHTML += "<p>" + data + "</p>"
  });

  submitButton.onclick = function(e) {
    var submission = document.getElementById('submission_text').value;

    e.preventDefault();
    client.emit('send', submission);
  };

  field.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) { // 13 is enter
      e.preventDefault();
      client.emit('send', submission);
    }
  });
}
