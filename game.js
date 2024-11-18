// Initial position and gravity + booster for spaceship
let spaceshipX = 400;
let spaceshipY = 400;
let velocity = 0;
const gravity = 0.1;
const bosstThrush = -3;

// Setups and creates the canvas width / height
function setup() {
  createCanvas(800, 600);
}

// Takes x and y positions and draws character "spaceship" on called coordinates
function spaceship(x, y, thrust) {
  stroke(150, 150, 150);
  fill(0, 255, 100);
  ellipse(x, y, 100, 150);

  fill(255, 255, 255);
  stroke(0, 0, 0);
  circle(x, y - 20, 50, 50);

  stroke(150, 150, 150);
  fill(100, 100, 100);
  bezier(x - 35, y + 50, x - 5, y + 70, x - 15, y + 70, x - 60, y + 90);
  bezier(x + 35, y + 50, x + 5, y + 70, x + 15, y + 70, x + 60, y + 90);

  triangle(x, y - 120, x - 30, y - 60, x + 30, y - 60);

  fill(0, 0, 0);
  strokeWeight(3);
  stroke(0, 0, 0);
  line(x, y + 5, x, y - 10);
  line(x, y + 5, x - 8, y - 5);
  line(x, y + 5, x + 8, y - 5);

  circle(x, y - 15, 10, 10);
}

function draw() {
  background('black');
  fill('grey');
  rect(0, 490, 800, 400);
  spaceship(400, 150);
}
