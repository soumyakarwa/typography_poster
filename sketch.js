let numberOfSquares = 8
let squareWidth = []
let marginX; 
let marginY; 
let textRect; 
let squares = [{x: 0, y:0, width:0, color:"x", txt:"", fontsize:0}]; 
let ibm; 
let speed = 0.02; 

function preload(){
  ibm =loadFont("ibmPlexMono.ttf");
  roboto = loadFont("roboto-regular.ttf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupHelper();
  frameRate(15);  
}

function draw() {
  background(255); 
  drawSquares();
  for(let i = 0; i < numberOfSquares; i++){
    resetMatrix(); 
    drawNestedText(i, squares[i].x+squares[i].width/2, squares[i].y+squares[i].width/2, textRect.length-i); 
  }
}

// Helper function to draw fibonacci squares
function drawSquares(){
  noStroke();  
  for(let i = 0; i <squares.length; i++){
    fill(squares[i].color); 
    rect(squares[i].x, squares[i].y, squares[i].width); 
  }
}

// Helper function to create nested paths
function drawNestedText(index, centerX, centerY, rectNumber) {
  let xOffset = centerX - textRect[0].width / 2;
  let yOffset = centerY - textRect[0].height / 2;
  
  if(!(mouseX >= centerX - squares[index].width/2 && mouseX <= centerX + squares[index].width/2 
    && mouseY >= centerY - squares[index].width/2 && mouseY <= centerY + squares[index].width/2)){
      for (let k = 0; k < rectNumber; k++) {
        translate(xOffset, yOffset);
        let totalPerimeter = (textRect[k].width + textRect[k].height) * 2;
        let charSpacing = totalPerimeter / textRect[k].txt.length;
  
        for (let i = 0; i < textRect[k].txt.length; i++) {
            displayText(i, charSpacing, textRect[k].width, textRect[k].height, textRect[k].txt, textRect[k].color, textRect[k].fontSize);
        }
  
        if (k < rectNumber - 1) {
          xOffset = (textRect[k].width - textRect[k + 1].width) / 2;
          yOffset = (textRect[k].height - textRect[k + 1].height) / 2;
      }
    }

    

  }
  else {
    // ellipse(centerX, centerY, 20); 
    push(); 
    textAlign(CENTER, CENTER);
    fill(squares[numberOfSquares-index-1].color);
    textSize(squares[index].fontsize); 
    textFont(roboto);
    text(squares[index].txt, centerX, centerY); 
    pop(); 
  }
  
}

// Helper function that writes the text on the pathway
function displayText(index, charSpacing, rWidth, rHeight, textStr, color, fontsize) {
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
    textSize(fontsize);
    textFont(roboto);  
    text(textStr.charAt(index), 0, 0);
    pop();
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
  
  squares[0] = {x: windowWidth-squareWidth[0]-marginX, y:marginY, width: squareWidth[0], color:"#201E5A", txt: "i", fontsize:squareWidth[0]/2}; 
  
  squares[1] = {x: squares[0].x - squareWidth[1], y:squares[0].y + squareWidth[0] - squareWidth[1], width: squareWidth[1], color:"#233B75", txt: "cc", fontsize:squareWidth[1]/2}; 
  
  squares[2] = {x: squares[1].x, y:squares[0].y, width: squareWidth[2], color:"#0077B6", txt: "a", fontsize:squareWidth[2]/2}; 

  squares[3] = {x: squares[1].x + squareWidth[2], y:squares[0].y, width: squareWidth[3], color:"#0396C7", txt: "n", fontsize:squareWidth[3]/2}; 

  squares[4] = {x: squares[3].x + squareWidth[3] - squareWidth[4], y:squares[3].y + squareWidth[3], width: squareWidth[4], color:"#02B4D7", txt: "o", fontsize:squareWidth[4]/2}; 

  squares[5] = {x: squares[3].x, y:squares[4].y + squareWidth[4] - squareWidth[5], width: squareWidth[5], color:"#4EC6E0", txt: "b", fontsize:squareWidth[5]/2}; 

  squares[6] = {x: squares[5].x, y:squares[3].y + squareWidth[3], width: squareWidth[6], color:"#97D8E8", txt: "i", fontsize:squareWidth[6]/2}; 

  squares[7] = {x: squares[6].x + squareWidth[6], y:squares[6].y, width: squareWidth[7], color:"#B0E1EE", txt: "f", fontsize:squareWidth[7]/2}; 

  textRect = [
    {txt: "1.61 ", width: squares[6].width/3, height: squares[6].width/3, charsDisplayed: 0, color: squares[7].color, fontSize: 14},
    {txt: "1.6180339887 ", width: squares[6].width, height: squares[6].width, charsDisplayed: 0, color: squares[6].color, fontSize: 16},
    {txt: "98948482045868343656 ",  width: squares[5].width, height: squares[5].width, charsDisplayed: 0, color: squares[5].color, fontSize: 18},
    {txt: "3811772030917980576286213544 ",  width: squares[4].width, height: squares[4].width, charsDisplayed: 0, color: squares[4].color, fontSize: 20},
    {txt: "86227052604628189024497072072041893911374847540 ",  width: squares[3].width, height: squares[3].width, charsDisplayed: 0, color: squares[3].color, fontSize: 22},
    {txt: "880753868917521266338622235369317931800607667263544333890865959395829056383 ",  width: squares[2].width, height: squares[2].width, charsDisplayed: 0, color: squares[2].color, fontSize: 24},
    {txt: "2661319928290267880675208766892501711696207032221043216269548626296313614438149758701220340805887954454749246185695364864 ",  width: squares[1].width, height: squares[1].width, charsDisplayed: 0, color: squares[1].color, fontSize: 28},
  ];
}



