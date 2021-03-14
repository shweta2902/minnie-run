var PLAY=1;
var END=0;
var gameState=PLAY;

var jumpSound,dieSound,checkPointSound;

var gameOver,gmeOverImage
var restart,restartImage;
var bug,bugImage

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4;
var score;
var flowerCount


function preload(){
  
  //trex_running = loadAnimation("minnie2.png","minnie3.png");
  trex_running = loadAnimation("trex.png")
  trex_collided= loadAnimation("minnie1.png");
  
  bugImage=loadImage("bug.png")
  
  groundImage = loadImage("ground1.jpg")
  cloudImage = loadImage("cloud.png")
  
  obstacle1=loadImage("tulip1.png")
  obstacle2=loadImage("tulip2.png")
  obstacle3=loadImage("tulip3.png")
  obstacle4=loadImage("tulip4.png")
 
  
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkPointSound=loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 500);
  score=0;
  flowerCount=0;
  //create a trex sprite
  trex = createSprite(100,100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  //adding scale and position to trex
  trex.scale = 0.3;
  trex.x = 50
  
  //bug=addImage(bugImage);
  
  //create ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //game over sprite
  gameOver=createSprite(300,100);
 gameOver.addImage(gameOverImage)
  gameOver.scale=0.5;
  gameOver.visible=false
  //restart sprite
   restart=createSprite(300,140)
   restart.addImage(restartImage)
   restart.scale=0.5;
  restart.visible=false;
  
  //invisible ground
  invisibleGround=createSprite(200,380,400,10);
  invisibleGround.visible=false;
  
  obstaclesGroup= new Group();
  cloudsGroup= new Group();
  bugsGroup=new Group();
  
  
  trex.setCollider("rectangle",0,0,200,200);
  trex.debug=true;
  
}



function draw() {
  background(180);
  text("score: " +score,500,20);
  
  console.log(gameState);
  
  
  if(gameState===PLAY)
    {
      gameOver.visible=false
      restart.visible=false
      
      //move the ground
      //ground.velocityX = -(4 + 3*score/100)
      ground.velocityX=-3;
      score=score+Math.round((frameCount/60));
      
      if (ground.x<0){
          ground.x = ground.width/2;
          }
  
      //jumping the trex on space key press
      if(keyDown("space") && trex.y>=100) {
       trex.velocityY = -10;
       
        }
      
      //Adding Gravity
      trex.velocityY = trex.velocityY + 0.8
      spawnBugs();
      spawnObstacles();
      spawnClouds();
      
      if(obstaclesGroup.isTouching(trex))
        {
          //trex.velocityY=-12;
          obstaclesGroup.destroyEach();
          flowerCount=flowerCount+1
        }
       else if(bugsGroup.isTouching(trex)){
        
        gameState=END;
        
      
          
        }
      
    }
         if (gameState===END)
        {
        //game over and restart visibilty
          gameOver.visible=true
          restart.visible=true
          
          //stop the ground
          ground.velocityX = 0;
          trex.velocityY=0;
          
          //trex image change
          trex.changeAnimation("collided",trex_collided);
      
          
          //reassigning the lifetime
          obstaclesGroup.setLifetimeEach(-1);
          bugsGroup.setLifetimeEach(-1);
          cloudsGroup.setLifetimeEach(-1);
          //stopping the cloud.obstacle
          obstaclesGroup.setVelocityXEach(0);
          bugsGroup.setVelocityXEach(0);
          cloudsGroup.setLifetimeEach(-1);
        
  
    }
  console.log(ground.x)
  //stop trex from falling down 
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnBugs()
{
  if(frameCount%120===0)
    {
      var bug= createSprite(600,50,40,10);
      bug.addImage(bugImage)
      bug.y=Math.round(random(10,500))
      bug.scale=0.03
      bug.velocityX=-2;
      
      //adjusting the depth
      bug.depth=trex.depth;
      trex.depth=trex.depth+1;
      
      bug.lifetime=300;
     bugsGroup.add(bug);
      
      
    }
}
function spawnObstacles()
{
  if(frameCount%60===0)
    {
      var obstacle = createSprite(600,250,40,10);
      obstacle.velocityX=-4
      //obstacle.velocityX=-(6 + score/100);
      
      var rand=Math.round(random(1,4))
      switch(rand){
          case 1: obstacle.addImage(obstacle1);
          obstacle.scale=0.01;
          break;
          
          case 2: obstacle.addImage(obstacle2);
          obstacle.scale=0.01;
          break;
          
          case 3: obstacle.addImage(obstacle3);
           obstacle.scale=0.2;
          break;
          
          case 4: obstacle.addImage(obstacle4);
           obstacle.scale=0.1;
          break;
          
          
          
          default: break;
      }
      //obstacle.scale=0.5;
      obstacle.lifetime=300;
      obstaclesGroup.add(obstacle);
    }
  
}

function spawnClouds()
{
  if(frameCount%80===0)
    {
      var cloud = createSprite(600,20,40,10);
      cloud.addImage(cloudImage)
      cloud.y=Math.round(random(10,60))
      cloud.scale=random(0.2,0.8)
      cloud.velocityX=-2;
      
      //adjusting the depth
      cloud.depth=trex.depth;
      trex.depth=trex.depth+1;
      
      cloud.lifetime=300;
      cloudsGroup.add(cloud);
      
      
    }
}