var r = 200
var angle = 0

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  let x = sin(angle) * r
  let y = cos(angle) * r


  fill(50, 200, 50)  //RGB + alpha
  rectMode(CENTER)
  noStroke()  // убрать обводку
  rect(x + width/2, y + height/2, 50, 50)  // рисовать квадрат

  angle += 0.05
}
