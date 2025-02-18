// Initial position and gravity + booster for spaceship
let spaceshipX = 400;
let spaceshipY = 150;
let velocityY = 0;
const gravity = 0.5;
const boostrThrust = -3;

// Game states

let gameState = "start";
let endMessage = "";

// Setups and creates the canvas width / height
function setup() {
  createCanvas(800, 600);
}

// Function takes x and y positions and draws character "spaceship" on called coordinates
function spaceship(x, y, boostrFiring) {
  // Spaceship body
  stroke(150, 150, 150);
  fill(0, 255, 100);
  ellipse(x, y, 100, 150);

  //Spaceship window
  fill(255, 255, 255);
  stroke(0, 0, 0);
  circle(x, y - 20, 50);

  //Spaceship legs
  stroke(150, 150, 150);
  fill(100, 100, 100);
  bezier(x - 35, y + 50, x - 5, y + 70, x - 15, y + 70, x - 60, y + 90);
  bezier(x + 35, y + 50, x + 5, y + 70, x + 15, y + 70, x + 60, y + 90);

  //Spaceship tip
  triangle(x, y - 120, x - 30, y - 60, x + 30, y - 60);

  //Spaceship passenger
  fill(0, 0, 0);
  strokeWeight(3);
  stroke(0, 0, 0);
  line(x, y + 5, x, y - 10);
  line(x, y + 5, x - 8, y - 5);
  line(x, y + 5, x + 8, y - 5);
  circle(x, y - 15, 10);

  //Creates a flame if player is firing boosters
  if (boostrFiring) {
    noStroke();
    fill(255, 100, 0);
    ellipse(x, y + 80, 30, 50);
    fill(255, 200, 0);
    ellipse(x, y + 90, 15, 30);
  }
}

function explosion(x, y) {
  // Third layer (orange)
  fill(255, 100, 0);
  beginShape();
  vertex(x - 50, y - 30);
  vertex(x - 60, y - 60);
  vertex(x - 20, y - 70);
  vertex(x + 20, y - 60);
  vertex(x + 50, y - 40);
  vertex(x + 70, y - 10);
  vertex(x + 50, y + 30);
  vertex(x + 20, y + 50);
  vertex(x - 20, y + 50);
  vertex(x - 60, y + 40);
  endShape(CLOSE);

  // Second layer (yellow)
  fill(255, 200, 0);
  beginShape();
  vertex(x - 30, y - 20);
  vertex(x - 40, y - 40);
  vertex(x - 10, y - 50);
  vertex(x + 10, y - 40);
  vertex(x + 30, y - 20);
  vertex(x + 40, y + 10);
  vertex(x + 30, y + 30);
  vertex(x + 10, y + 40);
  vertex(x - 10, y + 40);
  vertex(x - 40, y + 20);
  endShape(CLOSE);

  // First layer (white)
  fill(255, 255, 255);
  ellipse(x, y, 30, 30);
}

function draw() {
  background("black");

  if (gameState === "start") {
    // Start screen
    fill("white");
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Press SPACE to start", width / 2, height / 2);
    spaceship(spaceshipX, spaceshipY, false);
  } else if (gameState === "playing") {
    fill("grey");
    rect(0, 490, 800, 400);

    // Draws the surface
    fill("grey");
    rect(0, 490, 800, 400);

    // Applies gravity to the spaceship velocity
    velocityY += gravity;

    // Applies the velocity to the spaceship
    spaceshipY += velocityY;

    //Changes the velocity of spaceship if boosters are fired
    let boostrFiring = keyIsDown(32); //Looks if player press spacebar
    if (boostrFiring) {
      velocityY += boostrThrust;
    }

    //Draws the spaceship with the given parameters
    spaceship(spaceshipX, spaceshipY, boostrFiring);

    if (spaceshipY >= 440) {
      if (velocityY > 4) {
        explosion(spaceshipX, spaceshipY);
        console.log("Too fast on approach! Press ENTER to restart.");
        endMessage = "Too fast on approach! Press ENTER to restart";
        crash = true;
        gameState = "end";
      } else {
        console.log("Safe landing! Press ENTER to restart.");
        endMessage = "Safe landing! Press ENTER to restart";
        crash = false;
        gameState = "end";
      }
      velocityY = 0;
    }
  } else if (gameState === "end") {
    // Draw the spaceship on the end screen
    if (crash) {
      // Draw spaceship with explosion if crashed
      // Draws the surface
      fill("grey");
      rect(0, 490, 800, 400);
      spaceship(spaceshipX, 450, false); // Draw spaceship on surface
      explosion(spaceshipX, 450); // Show explosion
    } else {
      // Draw spaceship safely landed if not crashed
      // Draws the surface
      fill("grey");
      rect(0, 490, 800, 400);
      spaceship(spaceshipX, 450, false); // Draw spaceship on surface
    }
    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text(endMessage, 380, 300);
  }
  console.log(velocityY);
}

function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "playing";
  } else if (gameState === "end" && keyCode === ENTER) {
    spaceshipX = 400;
    spaceshipY = 150;
    velocityY = 0;
    gameState = "start";
  }
}
