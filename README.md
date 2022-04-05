# Joey-Garber-Tic-Tac-Toe Client

This application allows users to register and log in, play games of tic-tac-toe against a friend, check their stats, and sign out. I plan to add functionality to allow online play.

### Setup Steps

1. Fork and clone this repository
2. Run `npm install` then `npm install -g grunt-cli` to install dependencies
3. Run `grunt serve` to start up your local server.

### Important Links

https://joeygarber.github.io/Joey-Garber-Tic-Tac-Toe-Client/

### Screenshots

![Log-in Screen](https://i.imgur.com/Hn1u2LC.png)
![Game-board](https://i.imgur.com/sGG5bHo.png)

### Planning Story

I planned to start by completing all of the authentication aspects of the app first: sign-up, sign-in, and sign-out. Once those were all working with the API, I created the game board, set all the buttons to sense for user-inputs, and logged those inputs to the API as well. With that done I shifted to game logic: Making sure spaces were empty before clicking them, alternating whose move it was, and win-checking. Finally I worked on success messages, and wrapped it up with CSS to make this pretty for everyone.

### Wireframe

![Original Wireframe](https://i.imgur.com/11uxX08.jpg)

### User Stories

- As a user, I want to be able to sign up and log in all at once.
- As a signed-in user, I want to be able to change my password.
- As a signed-in user, I want to be able to abandon my games and start a new one whenever I want.
- As a signed-in user, I want to be able to come back to a game I abandoned and finish it off.
- As a signed-in user I want to be able to see a list of my stats.

### Technologies Used

- JQuery
- HTML/SCSS
- Bootstrap
- Javascript

### Unsolved Problems

- As you can see from user stories, there are a number of features I would like to add:
  - Adding login functionality upon sign-up.
  - Adding change password functionality.
  - Letting users reenter games.
- However, my biggest priority right now is adding online play.