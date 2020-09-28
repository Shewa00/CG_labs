var img;
var orig = [];
var resetButton, bwButton, invertButton;

function preload() {
  img = loadImage('https://BootyAss.github.io/Files/Photos/Kawai.jpg');
}

function setup() {
  createCanvas(650, 500);

  background(245);

  img.resize(width - 100, height - 100);

  drawImg();

  for (let i = 0; i < img.width; i++) {
    orig[i] = [];
    for (let j = 0; j < img.height; j++) {
      orig[i][j] = img.get(i, j);
    }
  }

  resetButton = createButton('Reset');
  bwButton = createButton('BW mode');
  invertButton = createButton('Invert mode');
  sobelButton = createButton('Sobel filter');

  resetButton.mousePressed(Reset);
  bwButton.mousePressed(BW);
  invertButton.mousePressed(Invert);
  sobelButton.mousePressed(Sobel);


  resetButton.position(120, 550);
  bwButton.position(250, 550);
  invertButton.position(400, 550);
  sobelButton.position(550, 550);


}


function drawImg() {
  image(img, 50, 50);
}

function BW() {
  clear();
  background(245);

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      img.set(i, j, (orig[i][j][0] + orig[i][j][1] + orig[i][j][2]) / 3);
    }
  }

  img.updatePixels();
  drawImg();
}

function Invert() {
  clear();
  background(245);

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      img.set(i, j, color(255 - orig[i][j][0], 255 - orig[i][j][1], 255 - orig[i][j][2]));
    }
  }

  img.updatePixels();
  drawImg();
}

function Reset() {
  clear();
  background(245);


  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      img.set(i, j, orig[i][j]);
    }
  }

  img.updatePixels();
  drawImg();
}

Gx = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1]
];
Gy = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1]
];

function Sobel() {
  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      X = 0;
      Y = 0;

     
      temp = (orig[x - 1][y - 1][0] + orig[x - 1][y - 1][1] + orig[x - 1][y - 1][2]) / 3;
      X += temp * Gx[0][0];
      Y += temp * Gy[0][0];

      temp = (orig[x][y - 1][0] + orig[x][y - 1][1] + orig[x][y - 1][2]) / 3;
      X += temp * Gx[1][0];
      Y += temp * Gy[1][0];

      temp = (orig[x + 1][y - 1][0] + orig[x + 1][y - 1][1] + orig[x + 1][y - 1][2]) / 3;
      X += temp * Gx[2][0];
      Y += temp * Gy[2][0];

      temp = (orig[x - 1][y][0] + orig[x - 1][y][1] + orig[x - 1][y][2]) / 3 ;
      X += temp * Gx[0][1];
      Y += temp * Gy[0][1];

      temp = (orig[x + 1][y][0] + orig[x + 1][y][1] + orig[x + 1][y][2]) / 3 ;
      X += temp * Gx[2][1];
      Y += temp * Gy[2][1];

      temp = (orig[x - 1][y + 1][0] + orig[x - 1][y + 1][1] + orig[x - 1][y + 1][2]) / 3 ;
      X += temp * Gx[0][2];
      Y += temp * Gy[0][2];

      temp = (orig[x][y + 1][0] + orig[x][y + 1][1] + orig[x][y + 1][2]) / 3 ;
      X += temp * Gx[1][2];
      Y += temp * Gy[1][2];

      temp = (orig[x + 1][y + 1][0] + orig[x + 1][y + 1][1] + orig[x + 1][y + 1][2]) / 3;
      X += temp * Gx[2][2];
      Y += temp * Gy[2][2];

      s = sqrt(sq(X) + sq(Y));
      img.set(x, y, color(s, s, s));
    }
  }
  img.updatePixels();
  drawImg();
}