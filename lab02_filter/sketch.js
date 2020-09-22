var img

function preload() {
  img = loadImage('https://BootyAss.github.io/Files/Photos/Kawai.jpg')
}

function setup() {
  createCanvas(600, 600);

}

function draw() {
  background(0);

  image(img, 10, 10)
  img.resize(width - 20, height - 20)

}
