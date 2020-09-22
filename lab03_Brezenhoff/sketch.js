var start = {
  x: 0,
  y: 0
}

var end = {
  x: 0,
  y: 0
}

var mouseIsReleased = false;

function setup() {
  createCanvas(1000, 700);
  background(255);
}

function draw() {
  if (mouseIsReleased) {
    background(255);
    drawLine(start.x, start.y, end.x, end.y);
    mouseIsReleased = false;
  }
}

function drawLine(x0, y0, x1, y1) {
  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = (x0 < x1) ? 1 : -1;
  var sy = (y0 < y1) ? 1 : -1;
  var err = dx - dy;

  while (true) {
    if (Math.abs(x0 - x1) < 0.0001 && Math.abs(y0 - y1) < 0.0001)
      break;
    var e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
    set(x0, y0, color(0, 0, 0));
    updatePixels();
  }
}

function mousePressed() {
  start.x = mouseX;
  start.y = mouseY;
}

function mouseReleased() {
  end.x = mouseX;
  end.y = mouseY;
  mouseIsReleased = true;
}

function keyPressed() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      set(i, j, color(255, 255, 255));
    }
  }
  updatePixels();
}
