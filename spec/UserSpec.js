var app     = require('../app.js'),
    user    = require('../lib/modules/user.js'),
    io      = require('../node_modules/socket.io/node_modules/socket.io-client'),
    http = require('http'),
    assert  = require('assert');

var users = [];

describe("User", function() {

  // var socket;

  // beforeEach(function() {
  //   socket = io.connect('http://localhost:3000', {
  //     'reconnection delay': 0,
  //     'reopen delay': 0,
  //     'force new connection': true
  //   });

  //   socket.on('connect', function() {
  //     console.log('Connected.');
  //     // done();
  //   });

  //   socket.on('disconnect', function() {
  //     console.log('Disconnected.')
  //   });
  // });

  // afterEach(function() {
  //   if (socket.socket.connected) {
  //     socket.disconnect();
  //   } else {
  //     console.log('No connection to end.');
  //   }
  //   // done();
  // });

  it("should be able to create a new user", function() {
    var newUser = user.addUser(users);
    expect(newUser).not.toBeNull();
    expect(newUser.username).toBeDefined();
    expect(newUser.correct).toEqual(0);
  });

  // it("should emit a welcome message", function() {
  //   http.get("http://localhost:3000/", function(error, response) {
  //     expect(response.body).toEqual("Welcome, " + users[1].username);
  //     done();
  //   });
  // });

  it("should be able to add an additional new user to user list", function() {
    var newerUser = user.addUser(users);
    expect(users.length).toEqual(2);
  });

  it("should be able to delete a user", function() {
    user.removeUser(users[1], users);
    expect(users.length).toEqual(1);
  });
});

