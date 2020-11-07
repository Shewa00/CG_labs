let size = 500;

let prevX, prevY, start;

let paint = false;


function setup() {
  createCanvas(size, size);
  background(255);
}


function mousePressed() {
  if (!paint) {
    background(255);
  }
}

function draw() {
  if (mouseIsPressed && !paint) {
    stroke(0, 0, 0);
    strokeWeight(3);
    if (prevX && prevY) {
      line(prevX, prevY, mouseX, mouseY);
    }

    prevX = mouseX;
    prevY = mouseY;
    if (!start) {
      start = [prevX, prevY];
    }
  }

}


function compareBlue(temp) {
  let res = true;
  if (temp[0] != 0 || temp[1] != 0 || temp[2] != 255) {
    res = false;
  }

  return res;
}

function compareBlack(temp) {
  let res = true;
  if (temp[0] != 0 || temp[1] != 0 || temp[2] != 0) {
    res = false;
  }

  return res;
}

function paintOver(begin) {
  let stack = new Stack();
  stack.push(begin);

  while (!stack.empty()) {
    P = stack.pop();

    x = P[0];
    y = P[1];

    xMin = x;
    while (!compareBlack(get(xMin - 1, y))) {
      xMin--;
    }
    xMax = x;
    while (!compareBlack(get(xMax + 1, y))) {
      xMax++;
    }

    fill(255, 0, 0);
    noStroke();
    for (let i = xMin; i <= xMax; i++) {
      rect(i, y, 1, 1);
    }

    let flag = true;
    for (i = xMin; i < xMax; i++) {
      let temp = get(i, y - 1);
      if (!compareBlack(temp) && !compareBlue(temp)) {
        if (flag) {
          stack.push([i, y - 1]);
          flag = false;
        }
      } else {
        flag = true;
      }
    }

    flag = true;
    for (let i = xMin; i < xMax; i++) {
      let temp = get(i, y + 1);
      if (!compareBlack(temp) && !compareBlue(temp)) {
        if (flag) {
          stack.push([i, y + 1]);
          flag = false;
        }
      } else {
        flag = true;
      }
    }
  }
}


function mouseClicked() {
  if (paint) {
    begin = [floor(mouseX), floor(mouseY)];
    paintOver(begin);
  }
}


function keyPressed() {
  if (key === 'r' || key === 'к') {
    background(255);
    fig = true;
  }
  if (key === ' ' || key === ' ') {
    paint = !paint;
  }
}