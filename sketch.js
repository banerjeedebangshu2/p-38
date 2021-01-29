var monkey, monkeyLoader, explosion;

var banana, bananaLoader, bananaGroup

var stone, stoneLoader, stoneGroup;

var jungle, jungleLoader;

var collider;

var arrow, arrowLoader;

var restartButton, restartButtonLoader;

var score;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {

  monkeyLoader = loadAnimation(

    "images/monkey/Monkey_01.png", 
    "images/monkey/Monkey_02.png", 
    "images/monkey/Monkey_03.png", 
    "images/monkey/Monkey_04.png", 
    "images/monkey/Monkey_05.png", 
    "images/monkey/Monkey_06.png", 
    "images/monkey/Monkey_07.png", 
    "images/monkey/Monkey_08.png", 
    "images/monkey/Monkey_09.png", 
    "images/monkey/Monkey_10.png"
  );

  bananaLoader = loadImage("images/banana.png");
  stoneLoader = loadImage("images/stone.png");
  jungleLoader = loadImage("images/jungle.jpg");
  explosion = loadAnimation("images/explosion.png");
  arrowLoader = loadImage("images/arrow.png");
  restartButtonLoader = loadImage("images/restart_button.png")

}

function setup() {
  createCanvas(750, 570);

  monkey = createSprite(250, 400);
  monkey.addAnimation("monkey", monkeyLoader);
  monkey.addAnimation("explosion", explosion);
  monkey.scale = 0.25
  monkey.setCollider("circle",0,0,200);
  
  //monkey.debug = true;
  
  //jungle = createSprite(375, 100);
  //jungle.addImage(jungleLoader);
  //jungle.scale = 1.5;
  
  
  //monkey.depth = jungle.depth+1;
  //jungle.velocityX = -10;
  monkey.velocityX =5;

  
  
  collider = createSprite(375,460,750,10);
  collider.visible = false;

  collider.velocityX =5;
  
  arrow = createSprite(375,285);
  arrow.addImage(arrowLoader);
  arrow.scale = 0.75;
  arrow.visible = false;
  
  restartButton = createSprite(100,100);
  restartButton.addImage(restartButtonLoader);
  restartButton.scale = 0.1;
  restartButton.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;

}

function draw() {
  background("orange");

  camera.position.x = monkey.x+180;
  camera.position.y = 285;
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(collider);
  
  //console.log(monkey.y)
  //console.log(score)
  //console.log(monkey.scale);
  
  if (gameState === PLAY) {
    
    score = score + Math.round(frameRate()/60);
    
    if (keyDown("space") && monkey.y >= 398.25) {  
      
      monkey.velocityY = -18;
    }

    image(jungleLoader, 0, -570, 750, 570);

    /*
    if (jungle.x < 0) {
      
      jungle.x = jungle.width/2;
    }
    */

    spawnStones();
    spawnBananas();
    
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(stoneGroup)) {
      gameState = END;
    }
    
  } else if (gameState === END) {
    
    //jungle.velocityX = 0;
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
   
    
    monkey.changeAnimation("explosion");
    
    if (frameCount % 2 === 0) {
      if (monkey.scale < 10) {
        
        monkey.scale = monkey.scale + 0.25;
      }
    }
    
    if (monkey.scale === 10) {
      
      
      //jungle.visible = false;
      monkey.visible = false;
      
      bananaGroup.destroyEach();
      stoneGroup.destroyEach();
      
      arrow.x = monkey.x +175;
      arrow.visible = true;

      restartButton.x = monkey.x -100;
      restartButton.visible = true;
      
    } 
    

    if (mousePressedOver(restartButton)) {
      restart();
    }
    
  }
  
  drawSprites();
  
  textSize(30);
  textFont("Georgia");
  textStyle(BOLD);
  fill("white");
  
  if (gameState === PLAY) {

    text("Score: "+ score, 300 + monkey.x,50);
  
  } 
  else if(monkey.scale === 10) {
    fill("#3D6DEB");
    text("Score: "+ score, 300 + monkey.x,50);
  }
  
}

function spawnStones() {
  if (camera.position.x % 300 === 0) {
   
    stone = createSprite(monkey.x +500,440)
    stone.addImage(stoneLoader);
    stone.scale = 0.25;
    
    stone.velocityX = -10;
    stone.lifetime = 75;
    stoneGroup.add(stone);
    
    monkey.depth = stone.depth + 1;
  }
}

function spawnBananas() {
  if (camera.position.x % 350 === 0) {
   
    banana = createSprite(monkey.x +500,random(200,320))
    banana.addImage(bananaLoader);
    banana.scale = 0.1;
    
    banana.velocityX = -10;
    banana.lifetime = 75;
    bananaGroup.add(banana);
    
    monkey.depth = banana.depth + 1;
  }
}

function restart() {
  
  gameState = PLAY;
  
  arrow.visible = false;
  restartButton.visible = false;
  
  //jungle.visible = true;
  monkey.visible = true;
  
  monkey.changeAnimation("monkey");
  monkey.scale = 0.25;
  monkey.x = collider.x-125;
  monkey.y = collider.y-60;
  
  //jungle.velocityX = -10;
  
  score = 0;
}




