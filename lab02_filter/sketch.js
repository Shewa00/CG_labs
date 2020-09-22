var img
var or = []

function preload() {
  img = loadImage('https://BootyAss.github.io/Files/Photos/Kawai.jpg')
}

function setup() {
  createCanvas(500, 500);

  background(0);

  drawImg()

  for (let i = 0; i < img.width; i++) {
    or[i] = [];
    for (let j = 0; j < img.height; j++) {
      or[i][j] = img.get(i, j);
    }
  }

  var Reset = createButton('reset')
  Reset.mousePressed(reset)

  var Invert = createButton('invert')
  Invert.mousePressed(invert)

  var BW = createButton('bw')
  BW.mousePressed(bw)
}

function drawImg() {
  img.resize(width - 20, height - 20)
  image(img, 10, 10)
}

function reset() {
  clear();
  background(0);


  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, or[x][y]);
    }
  }

  img.updatePixels();
  drawImg();
}


function invert() {
  clear();
  background(255);

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, color(255 - or[x][y][0], 255 - or[x][y][1], 255 - or[x][y][2]));
    }
  }
  img.updatePixels()
  drawImg()
}

function bw() {
  clear();
  background(120);

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, color((or[x][y][0] + or[x][y][1] + or[x][y][2])/3));
    }
  }
  img.updatePixels()
  drawImg()
}
