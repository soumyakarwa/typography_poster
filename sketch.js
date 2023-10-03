let numberOfSquares = 8
let squareWidth = []
let squareX = []; 
let squareY = []; 
// dark to light blue shades
let blueShades = ["#201E5A", "#233B75", "#0077B6", "#0396C7", "#02B4D7", "#4EC6E0", "#97D8E8", "#B0E1EE"]; 
let marginX; 
let marginY; 
let rectangles; 
let fontSize = 30;
let ibm; 
let speed = 0.02; 

function preload(){
  ibm =loadFont("ibmPlexMono.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupHelper();
  frameRate(15);  
}

function draw() {
  background(255); 
  drawSquares();
  for(let i = 0; i < numberOfSquares-1; i++){
    resetMatrix(); 
    drawNestedText(squareX[i]+squareWidth[i]/2, squareY[i]+squareWidth[i]/2, rectangles.length-i); 
  }
}

// Helper function that initializes squareWidth, squareX, squareY and all rectanlge properties 
function setupHelper(){
  squareWidth[7] = 36; 
  squareWidth[6] = 36;
  for(let i = 5; i > -1; i--){
    squareWidth[i] = squareWidth[i+1] + squareWidth[i+2]; 
  }
  marginX = (windowWidth - squareWidth[0] - squareWidth[1])/2; 
  marginY = (windowHeight-squareWidth[0])/2;

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

  rectangles = [
    {txt: "1.6180339887 ", width: squareWidth[6], height: squareWidth[6], charsDisplayed: 0, color: blueShades[6]},
    {txt: "98948482045868343656 ",  width: squareWidth[5], height: squareWidth[5], charsDisplayed: 0, color: blueShades[5]},
    {txt: "3811772030917980576286213544 ",  width: squareWidth[4], height: squareWidth[4], charsDisplayed: 0, color: blueShades[4]},
    {txt: "86227052604628189024497072072041893911374847540 ",  width: squareWidth[3], height: squareWidth[3], charsDisplayed: 0, color: blueShades[3]},
    {txt: "880753868917521266338622235369317931800607667263544333890865959395829056383 ",  width: squareWidth[2], height: squareWidth[2], charsDisplayed: 0, color: blueShades[2]},
    {txt: "2661319928290267880675208766892501711696207032221043216269548626296313614438149758701220340805887954454749246185695364864 ",  width: squareWidth[1], height: squareWidth[1], charsDisplayed: 0, color: blueShades[1]},
  ];
}

// Helper function to draw fibonacci squares
function drawSquares(){
  noStroke(); 
  for(let i = 0; i <squareX.length; i++){
    fill(blueShades[i]); 
    rect(squareX[i], squareY[i], squareWidth[i]); 
  }
}

// Helper function to create nested paths
function drawNestedText(centerX, centerY, rectNumber) {
  let xOffset = centerX - rectangles[0].width / 2;
  let yOffset = centerY - rectangles[0].height / 2;

  for (let k = 0; k < rectNumber; k++) {
      translate(xOffset, yOffset);
      let totalPerimeter = (rectangles[k].width + rectangles[k].height) * 2;
      let charSpacing = totalPerimeter / rectangles[k].txt.length;

      for (let i = 0; i < rectangles[k].txt.length; i++) {
          displayText(i, charSpacing, rectangles[k].width, rectangles[k].height, rectangles[k].txt, rectangles[k].color);
      }

      if (k < rectNumber - 1) {
        xOffset = (rectangles[k].width - rectangles[k + 1].width) / 2;
        yOffset = (rectangles[k].height - rectangles[k + 1].height) / 2;
    }
  }
}

// Helper function that writes the text on the pathway
function displayText(index, charSpacing, rWidth, rHeight, textStr, color) {
  let dist = (index * charSpacing + millis() * speed) % (2 * (rWidth + rHeight)); 
  let x, y, angle = 0;

  if (dist < rWidth) {
      x = dist;
      y = 0;
  } else if (dist < rWidth + rHeight) {
      x = rWidth;
      y = dist - rWidth;
      angle = HALF_PI;
  } else if (dist < rWidth * 2 + rHeight) {
      x = rWidth - (dist - (rWidth + rHeight));
      y = rHeight;
      angle = PI;
  } else {
      x = 0;
      y = rHeight - (dist - (rWidth * 2 + rHeight));
      angle = -HALF_PI;
  }

  push();
  translate(x, y);
  rotate(angle);
  fill(color);
  textSize(fontSize);
  textFont(ibm);  
  text(textStr.charAt(index), 0, 0);
  pop();
}



