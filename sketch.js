let numberOfSquares = 8
let squareWidth = []
let squareX = []; 
let squareY = []; 
// dark to light blue shades
let blueShades = ["#201E5A", "#233B75", "#0077B6", "#0396C7", "#02B4D7", "#4EC6E0", "#97D8E8", "#B0E1EE"]; 
let marginX; 
let marginY; 
let phi; 
let b; 
let xLoc; 
let yLoc; 
let radius; 
let theta = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  setSquareWidth(); 
  phi = (1+ sqrt(5))/2; 
  b = (log(phi))/(PI/2); 
  radius = squareWidth[7];
}

function draw() {
  background(255); 
  drawSquares();
  spiralGraph(); 
  theta += PI/180; 
  radius += 0.5; 
}

function spiralGraph(){
  let e = Math.exp(b * theta);
  xLoc = radius * e * cos(-theta); 
  yLoc = radius * e * sin(-theta); 
  fill(0); 
  // The position starts from the center of square7
  ellipse(xLoc + squareX[7] + squareWidth[7]/2, yLoc + squareY[7] + squareWidth[7]/2, 10); 
}

function setSquareWidth(){
  squareWidth[7] = 36; 
  squareWidth[6] = 36;
  for(let i = 5; i > -1; i--){
    squareWidth[i] = squareWidth[i+1] + squareWidth[i+2]; 
  }
  marginX = (windowWidth - squareWidth[0] - squareWidth[1])/2; 
  marginY = (windowHeight-squareWidth[0])/2;
}

function drawSquares(){
  noStroke(); 
  squareX[0] = windowWidth-squareWidth[0]-marginX; 
  squareY[0] = marginY; 
  
  squareX[1] = squareX[0] - squareWidth[1]; 
  squareY[1] = squareY[0] + squareWidth[0] - squareWidth[1]; 
  
  squareX[2] = squareX[1]; 
  squareY[2] = squareY[0]; 
  
  squareX[3] = squareX[1] + squareWidth[2]; 
  squareY[3] = squareY[0]; 
  
  squareX[4] = squareX[3] + squareWidth[3] - squareWidth[4]; 
  squareY[4] = squareY[3] + squareWidth[3]; 
  
  squareX[5] = squareX[3]; 
  squareY[5] = squareY[4] + squareWidth[4] - squareWidth[5]; 

  squareX[6] = squareX[5]; 
  squareY[6] = squareY[3] + squareWidth[3]; 
  
  squareX[7] = squareX[6] + squareWidth[6]; 
  squareY[7] = squareY[6]; 
  
  for(let i = 0; i <squareX.length; i++){
    fill(blueShades[i]); 
    rect(squareX[i], squareY[i], squareWidth[i]); 
  }
}
