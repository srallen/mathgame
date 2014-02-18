var user = require('../routes/user.js');

describe("User", function() {

  it("should be able to create a new user", function() {
    user.addUser();
    expect(user.username).not.toBeNull();
  });

  xit("should be able to add new user to user list", function() {
    user.userList();
    expect()
  });
});
