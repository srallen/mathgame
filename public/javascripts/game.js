window.onload = function() {
  var client = io.connect('http://mighty-beyond-9595.herokuapp.com/'),
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
    data.sort(function(a,b){return a.correct - b.correct});
    for (var i = data.length - 1; i >= 0; i--) {
      var user = data[i];
      str += "<li>" + user.username + ": " + user.correct + "</li>";
    };

    users.innerHTML = "<ul>" + str + "</ul>";
  });

  client.on('message', function(data) {
    chat.innerHTML += "<p>" + data + "</p>"
    chat.scrollTop = chat.scrollHeight;
  });

  submitButton.onclick = function(e) {
    var submission = field.value;

    e.preventDefault();
    client.emit('send', submission);
    console.log(submission + ' sent');
    field.value = '';
  };

  field.addEventListener('keydown', function(e) {
    var key = e.which || e.keyCode;
    var submission = field.value;

    if (key == 13) { // 13 is enter
      e.preventDefault();
      client.emit('send', submission);
      console.log(submission + ' sent');
      field.value = '';
    }
  });

}
