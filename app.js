
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var math    = require('./math.js');
var path    = require('path');

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Users connected to server
var users = [];


io.sockets.on('connection', function(socket) {
  var currentUser = user.addUser(users);
  var challenge = math.randomMath();
  console.log(challenge);

  socket.emit('welcome', currentUser);
  io.sockets.emit('message', currentUser.username + ' joins the game.');
  io.sockets.emit('users', users);


  socket.on('send', function(answer) {
    if (answer == String(challenge.solution)) {
      math.checkAnswer(answer, challenge)
      io.sockets.emit('message', currentUser.username + ' answered correctly with ' + answer + '.');
      io.sockets.emit('users', users);
    } else {
      socket.emit('message', 'Please try again.');
    }
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('message', currentUser.username + ' leaves the game.');
    user.removeUser(currentUser, users);
    socket.broadcast.emit('users', users)
  });
});





