var size = 600;

function setup() {
  createCanvas(size, size);
  background(255);
}


let dLine = [];
let dObj = [];
let line = false;


function mouseClicked() {
  if (0 < mouseX && mouseX < size && 0 < mouseY && mouseY < size) {
    noStroke();
    if (line) {
      if (dLine.length == 0) {
        dLine.push([mouseX, mouseY]);
      } else {
        dLine.push([mouseX, mouseY]);
        drawLine(dLine[0][0], dLine[0][1], dLine[1][0], dLine[1][1], color(0, 0, 0));

        intersect();

        dLine = [];
      }
    } else {
      fill(0, 0, 255);
      dObj.push([mouseX, mouseY]);
      if (dObj.length > 1) {
        prev = dObj[dObj.length - 2];
        curr = dObj[dObj.length - 1];
        drawLine(prev[0], prev[1], curr[0], curr[1], color(0, 0, 255));
      }
    }
  }
}


function keyPressed() {
  if (key === ' ') {
    if (dObj.length > 2) {
      first = dObj[0];
      last = dObj[dObj.length - 1];
      drawLine(first[0], first[1], last[0], last[1], color(0, 0, 255));
      line = true;
    }
  }
  
  if (key === 'r' || key === 'к') {
    background(255);
    line = false;
    dObj = [];
    dLine = [];
  }
}


function drawLine(x0, y0, x1, y1, c) {
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
    
    fill(c);
    rect(x0, y0, 2, 2);
  }
}


function check(p1, p2, p3, p4) {
  // конец первого отрезка находится левее начала правого отрезка
  if (p2[0] < p3[0]) {
    return false;
  }

  //если оба отрезка вертикальные
  if ((p1[0] - p2[0] == 0) && (p3[0] - p4[0] == 0)) {

    //если они лежат на одном X
    if (p1[0] == p3[0]) {

      //они НЕ пересекаются
      if (((max(p1[1], p2[1]) < min(p3[1], p4[1])) || (min(p1[1], p2[1]) > max(p3[1], p4[1])))) {
        return false;
      }
    }
  }

  //если первый отрезок вертикальный
  if (p1[0] - p2[0] == 0) {

    //найдём Xa, Ya - точки пересечения двух прямых
    Xa = p1[0];
    A2 = (p3[1] - p4[1]) / (p3[0] - p4[0]);
    b2 = p3[1] - A2 * p3[0];
    Ya = A2 * Xa + b2;

    if (p3[0] <= Xa && p4[0] >= Xa && min(p1[1], p2[1]) <= Ya && max(p1[1], p2[1]) >= Ya) {
      return [Xa, Ya];
    }

    return false;
  }

  //если второй отрезок вертикальный
  if (p3[0] - p4[0] == 0) {

    //найдём Xa, Ya - точки пересечения двух прямых
    Xa = p3[0];
    A1 = (p1[1] - p2[1]) / (p1[0] - p2[0]);
    b1 = p1[1] - A1 * p1[0];
    Ya = A1 * Xa + b1;

    if (p1[0] <= Xa && p2[0] >= Xa && min(p3[1], p4[1]) <= Ya && max(p3[1], p4[1]) >= Ya) {
      return [Xa, Ya];
    }

    return false;
  }

  //оба отрезка невертикальные
  A1 = (p1[1] - p2[1]) / (p1[0] - p2[0]);
  A2 = (p3[1] - p4[1]) / (p3[0] - p4[0]);
  b1 = p1[1] - A1 * p1[0];
  b2 = p3[1] - A2 * p3[0];

  if (A1 == A2) {
    return false; //отрезки параллельны
  }

  //Xa - абсцисса точки пересечения двух прямых
  Xa = (b2 - b1) / (A1 - A2);
  Ya = A1 * Xa + b1;

  if ((Xa < max(p1[0], p3[0])) || (Xa > min(p2[0], p4[0]))) {
    //точка Xa находится вне пересечения проекций отрезков на ось X 
    return false;
  } else {
    return [Xa, Ya];
  }
  return false;
}


function intersect() {
  let p1 = [dLine[0][0], dLine[0][1]];
  let p2 = [dLine[1][0], dLine[1][1]];
  if (p2[0] < p1[0]) {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
  }

  let p3, p4;
  let Coards = [];
  for (let i = 0; i < dObj.length; i++) {
    p3 = [dObj[i][0], dObj[i][1]];

    let j = i + 1;
    if (j == dObj.length) {
      j = 0;
    }

    p4 = [dObj[j][0], dObj[j][1]];

    if (p4[0] < p3[0]) {
      tmp = p3;
      p3 = p4;
      p4 = tmp;
    }

    res = check(p1, p2, p3, p4);
    if (res) {
      Coards.push(res);
    }
  }
  if (Coards.length == 2) {
    x0 = floor(Coards[0][0]);
    y0 = floor(Coards[0][1]);
    x1 = floor(Coards[1][0]);
    y1 = floor(Coards[1][1]);
    drawLine(x0, y0, x1, y1, color(255, 0, 0));
  }
}