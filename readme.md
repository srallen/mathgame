Check out a live demo at:

http://mighty-beyond-9595.herokuapp.com/

Note: there may be a slight delay with starting up the web app because I am using a free Heroku account. Please give it a few seconds.

Or clone the repo locally.

1) Change line 2 in public/javascripts/game.js to:

var client = io.connect('http://localhost:3000'),

2) Run on the command line:

node app.js

Test suite is still in development.
