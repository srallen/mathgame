var app  = require('../app.js')
var user = require('../routes/user.js');
var users = [];

describe("User", function() {

  it("should be able to create a new user", function() {
    var newUser = user.addUser(users);
    expect(newUser).not.toBeNull();
    expect(newUser.username).toBeDefined();
    expect(newUser.correct).toEqual(0);
  });

  it("should be able to add an additional new user to user list", function() {
    var newerUser = user.addUser(users);
    expect(users.length).toEqual(2);
  });

  it("should be able to delete a user", function() {
    user.removeUser(users[1], users);
    expect(users.length).toEqual(1);
  });
});
