var path, pathImg;
var mainRacer, mainRacerImg1, mainRacerImg2;
var obstacle, obstacleImg1, obstacleImg2, obstacleImg3;
var player1, player1Img1, player1Img2;
var player2, player2Img1, player2Img2;
var player3, player3Img1, player3Img2;
var gameOver, gameOverImg;
var racerBell;
var restart;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var num, rand;
var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  player1Img1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  player1Img2 = loadAnimation("images/opponent3.png");
  player2Img1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  player2Img2 = loadAnimation("images/opponent6.png");
  player3Img1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  player3Img2 = loadAnimation("images/opponent9.png");
  obstacleImg1 = loadImage("images/obstacle1.png");
  obstacleImg2 = loadImage("images/obstacle2.png");
  obstacleImg3 = loadImage("images/obstacle3.png");
  racerBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {
  
createCanvas(1200,300);
  
// Moving background
path = createSprite(100,150);
path.addImage(pathImg);

//creating boy running
mainRacer = createSprite(70,150,20,20);
mainRacer.addAnimation("SahilRunning",mainRacerImg1);
mainRacer.scale = 0.07;

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;

pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstacleGroup = new Group();
}

function draw() {
  background(0);

  mainRacer.setCollider("rectangle",0,0,1400,1400);
  mainRacer.debug = false;
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,1000,30);
  
  if(gameState === PLAY){
  
   mainRacer.y = World.mouseY;
  
   edges = createEdgeSprites();
   mainRacer.collide(edges);
   
   path.velocityX = -(6 + distance/150);
    
   distance += Math.round(getFrameRate()/50);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
  if (keyDown("space")) {
    racerBell.play();
  }
  
    num = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0){
      if (num == 1) {
        Pink();
      } else if (num == 2) {
        Yellow();
      } else if (num == 3) {
        Red();
      }
    }
    if(pinkCG.isTouching(mainRacer)){
       gameState = END;
       pinkCG.setVelocityXEach(0);
       pinkCG.setLifetimeEach(-1);
       player1.addAnimation("player1", player1Img2);
     }
    
     if(yellowCG.isTouching(mainRacer)){
        gameState = END;
        yellowCG.setVelocityXEach(0);
        yellowCG.setLifetimeEach(-1);
        player2.addAnimation("player2", player2Img2);
     }
    
     if(redCG.isTouching(mainRacer)){
        gameState = END;
        redCG.setVelocityXEach(0);
        redCG.setLifetimeEach(-1);
        player3.addAnimation("player3", player3Img2);
     }
    
     if (obstacleGroup.isTouching(mainRacer)) {
       pinkCG.setVelocityXEach(8);
       yellowCG.setVelocityXEach(8);
       redCG.setVelocityXEach(8);
       gameState = END;
     }
  
    spawnObstacles();
  } 
  
  if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainRacer.addAnimation("SahilRunning",mainRacerImg2);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    if (keyDown("UP_ARROW")) {
      resets();
    }
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   
   obstacle = createSprite(1100,Math.round(random(50,250)),10,10);
   obstacle.velocityX = -(8 + distance/150);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImg1);
              break;
      case 2: obstacle.addImage(obstacleImg2);
              break;
      case 3: obstacle.addImage(obstacleImg3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.05;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function Pink() {
  player1 = createSprite(1100,Math.round(random(50,250)),10,10);
  player1.addAnimation("player1", player1Img1);
  player1.velocityX = -(6 + distance/150);
  player1.scale = 0.06;
  player1.lifetime = 200;
  pinkCG.add(player1);
}

function Yellow() {
  player2 = createSprite(1100,Math.round(random(50,250)),10,10);
  player2.addAnimation("player2", player2Img1);
  player2.velocityX = -(6 + distance/150);
  player2.scale = 0.06;
  player2.lifetime = 200;
  yellowCG.add(player2);
}

function Red() {
  player3 = createSprite(1100,Math.round(random(50,250)),10,10);
  player3.addAnimation("player3", player3Img1);
  player3.velocityX = -(6 + distance/150);
  player3.scale = 0.06;
  player3.lifetime = 200;
  redCG.add(player3);
}

function resets(){
  gameState = PLAY;
  gameOver.visible = false;
  mainRacer.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstacleGroup.destroyEach();
  
  distance = 0;
}