'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  // Enemies will be instantiated with different speeds
  // Speeds are adjusted depending on player score
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Enemies move from left to right.
  // If an enemy is right of the canvas, the enemy's position
  // will be set to left of the canvas and the enemy will
  // continue to move from left to right at the next fnct call
  if (this.x > 500){
    this.x = -100;
  }
  else{
    this.x = this.x + (90 * dt) * this.speed;
  }
  // Collision detection.
  if ((player.x < this.x + 35 && player.x > this.x - 35) &&
  (player.y < this.y + 30 && player.y > this.y - 50)){
    // Decrement player score if it is greater than 0
    // Adjust enemy speed if player score is greater than 0
    if (player.score > 0){
      player.score--;
      document.getElementById('score').textContent= player.score.toString();
      allEnemies.forEach(function(enemy){
      enemy.speed = enemy.speed - 0.1;
      });
    }
    // Reset player position to starting position
    player.x = player.startingPosition[0];
    player.y = player.startingPosition[1];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.startingPosition = [252, 400];
  this.sprite = 'images/char-boy.png';
  this.x = this.startingPosition[0];
  this.y = this.startingPosition[1];
  this.score = 0;
};

Player.prototype.update = function() {
  // can't think of anything that should go here
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyMark) {
  // If player reaches water reset position, add increment score,
  // increase enemy speed
  if (this.y < 30){
    this.x = this.startingPosition[0];
    this.y = this.startingPosition[1];
    this.score++;
    allEnemies.forEach(function(enemy){
      enemy.speed = enemy.speed + 0.1;
    });
    document.getElementById('score').textContent= this.score.toString();
  }
  // Adjust player position depending on keyboard input
  // and location of player
  if (keyMark === 'left' && this.x >= -18){
    this.x = this.x - 30;
  }
  else if (keyMark === 'right' && this.x <= 402){
    this.x = this.x + 30;
  }
  else if (keyMark === 'up' ){
    this.y = this.y - 30;
  }
  else if (keyMark === 'down' && this.y <= 370){
    this.y = this.y + 30;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
allEnemies = [new Enemy(-50, 50, 1.3), new Enemy(-200, 50, 1.3), new Enemy(-375, 50, 1.3),
new Enemy(-50, 140, 0.8), new Enemy(-300, 140, 0.8), new Enemy(-425, 140, 0.8),
new Enemy(300, 225, 1), new Enemy(100, 225, 1), new Enemy(-100, 225, 1)];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});