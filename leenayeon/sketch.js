let img;
let pallete;
function preload() {
  img = loadImage("이나연 먀.jpeg");
  pallete = loadImage("pppp.jpg");
}


let timerLimit1 = 20000;
let timerLimit2 = 50000;
let randomDot1 = 2;
let randomDot2 = 15;
let ratio = 1.0;
let counter = 0;
let startx = 0;
let starty = 0;
let ratiow = 100;
let ratioh = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  setPallete();
  img.loadPixels();
  counter = millis();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  counter = millis();
}
function calcuRatio() {
  ratio = width/height;
  let marginw = 0;
  let marginh = 0;
  if (ratio>=1.0) {
    marginh = (width - height);
    ratiow = width;
    ratioh = width;
    startx = 0;
    if (millis()-counter<timerLimit1) {
      starty = -marginh*((millis()-counter)/timerLimit1);
    } else {
      starty = -marginh*(1.0-((millis()-counter-timerLimit1)/(timerLimit2-timerLimit1)));
    }
  } else {
    marginw = (height - width);
    ratiow = height;
    ratioh = height;
    starty = 0;
    if (millis()-counter<timerLimit1) {
      startx = -marginw*((millis()-counter)/timerLimit1);
    } else {
      startx = -marginw*(1.0-((millis()-counter-timerLimit1)/(timerLimit2-timerLimit1)));
    }
  }
}

function draw() {
  calcuRatio();
  if (millis()-counter<timerLimit1) {
    let alpha = ((millis()-counter)/timerLimit1)*255.0;
    tint(255, alpha);
    image(img, startx, starty, ratiow, ratioh);
  } else if (millis()-counter<timerLimit2) {
    //noStroke();
    for (let i=0; i<400; i++) {
      let x = random(width);
      let y = random(height);
      let s = random(randomDot1, randomDot2);
      let gr = getGrey2(x, y, startx, starty, ratiow, ratioh);
      let idx = getIdx2(x, y, startx, starty, ratiow, ratioh);
      //stroke(pR[gr], pG[gr], pB[gr]);
      stroke(img.pixels[idx+0], img.pixels[idx+1], img.pixels[idx+2], 250);
      //fill(getRed(x, y), getGreen(x, y), getBlue(x, y));
      //fill(getR(x, y), getG(x, y), getB(x, y), 100);
      strokeWeight(s);
      point(x, y);
      //circle(x, y, s);
    }
  } else {
    counter = millis();
  }
  
}