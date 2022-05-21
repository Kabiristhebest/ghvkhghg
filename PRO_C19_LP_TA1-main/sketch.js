var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
//var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0

function preload(){
  towerImg = loadImage("1309717.jpg");
  doorImg = loadImage("ghost-standing.png ");
  climberImg = loadImage("Astroeid.png");
  ghostImg = loadImage("rocket.png");
  //spookySound = loadSound("");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  //invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.07;
  ghost.addImage("ghost", ghostImg);

}

function draw(){
  background(0);
 

  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(climbersGroup.isTouching(ghost) || ghost.y > 600 || ghost.y <0 || ghost.x<0 || ghost.x>600){
      ghost.destroy();
      gameState = "end"
    }
    if(frameCount%100===0){
      score=score+1 
    }
    drawSprites();
    textSize(20)
    fill("white")
    text("Score: "+score,450, 50)
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    climber.scale=0.15;
    door.scale=0.2
    //var invisibleBlock = createSprite(200,15);
    //invisibleBlock.width = climber.width;
    //invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    //invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    //invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    //invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    //invisibleBlock.debug = false;
    climbersGroup.debug=true
    climbersGroup.add(climber);
    //invisibleBlockGroup.add(invisibleBlock);
  }
}

