/*
Student Editor: m1221
Date: 08/18/2015
Purpose of code: This code was edited to add functionality to a game file
provided by Udacity.

*/

'use strict';
// Player must avoid enemies
var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png'; // image of enemy
  this.x = x; // x position on canvas of enemy
  this.y = y; // y position on canvas of enemy
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
    if (player.score > 0){ // If player score is greater than 0:
      player.score--; // Decrement player score
      document.getElementById('score').textContent = player.score.toString();
      allEnemies.forEach(function(enemy){
      enemy.speed = enemy.speed - 0.1; // Adjust enemy speed if player score
      });
    }
    // Reset player position to starting position
    player.x = player.startingPosition[0];
    player.y = player.startingPosition[1];
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// User must control player and guide him safely to water
var Player = function() {
  this.startingPosition = [252, 400];
  this.sprite = 'images/char-boy.png';
  this.x = this.startingPosition[0];
  this.y = this.startingPosition[1];
  this.score = 0;
};

// Draw player on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyMark) {
  // If player reaches water then reset position, increment score,
  // and increase enemy speed
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

// Instantiate objects for player and enemies
var player = new Player();
var allEnemies = [new Enemy(-50, 50, 1.3), new Enemy(-200, 50, 1.3), new Enemy(-375, 50, 1.3),
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