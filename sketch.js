var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImage;
var zombieGroup;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var bullets,bulletimage;
var bulletgroup;
var score=0;
var life=3;
var bullets=70;
var gameState="fight";
var lose,winning,explosionSound;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg");
  zombieImage=loadImage("assets/zombie.png");
  heart1Img=loadImage("assets/heart_1.png");
  heart2Img=loadImage("assets/heart_2.png");
  heart3Img=loadImage("assets/heart_3.png");
  bulletimage=loadImage("assets/bullet.png");
  lose=loadSound("assets/lose.mp3");
  winning=loadSound("assets/win.mp3");
  explosionSound=loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1=createSprite(displayWidth-150,40,20,20);
  heart1.visible=false;
   heart1.addImage("heart1",heart1Img);
   heart1.scale=0.4;

   heart2=createSprite(displayWidth-100,40,20,20);
   heart2.visible=false;
   heart2.addImage("heart2",heart2Img);
   heart2.scale=0.4;

   heart3=createSprite(displayWidth-150,40,20,20);
   heart3.visible=false;
   heart3.addImage("heart3",heart3Img);
   heart3.scale=0.4;



zombieGroup=new Group();
bulletgroup=new Group();

}

function draw() {

  background(0); 


if(gameState==="fight"){
if(life===3){
  heart3.visible=true;
  heart1.visible=false;
  heart2.visible=false;
}
if(life===2){
heart3.visible=false;
heart2.visible=true;
heart1.visible=false;
}
if(life===1){
heart1.visible=true;
heart2.visible=false;
heart3.visible=false;
}


if(life===0){
  gameState="lost";
}
if(score===100){
  gameState="won";
  winning.play();
}

}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 ammo();

  player.addImage(shooter_shooting)
 player.depth=bullets.depth;
 player.depth=player.depth+2;

}
if(bullets===0){
  gameState="bullet";
  lose.play();

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(player)){
  lose.play();
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
  life=life-1;
    }
  }
}

if(zombieGroup.isTouching(bulletgroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletgroup)){
      zombieGroup[i].destroy();
      bulletgroup.destroyEach();
      explosionSound.play();
      score=score+2;

    }
  }
}
enemy();
drawSprites();
textSize(20);
fill("white");
text("Bullets:"+bullets,displayWidth-210,displayHeight/2-250);


text("Life:"+life,displayWidth-50,displayHeight/2-250);
text("Score:"+score,displayWidth-350,displayHeight/2-250);
if(gameState==="lost"){
  zombieGroup.destroyEach();
  player.destroy();
  textSize(100);
  fill("red");
  text("You Lost",400,400);

}
if(gameState==="won"){
  zombieGroup.destroyEach();
  player.destroy();
textSize(100);
fill("cyan");
text("You Won",400,400);
}
else if(gameState==="bullet"){
textSize(50);
bullets=0;
fill("yellow");
text("You Ran Out Of Bullets!!!",470,410);
player.destroy();
zombieGroup.destroyEach();
bulletgroup.destroyEach();
}

}
function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImage);
    zombie.scale=0.15;
    zombie.velocityX=-3;
    zombie.setCollider("rectangle",0,0,400,400);
    zombie.lifetime=400;
    zombieGroup.add(zombie);
  }
}
function ammo(){
  bullet=createSprite(displayWidth-1150,player.y-30,10,10);
  bullet.x=player.x+100;
  bullet.velocityX=10;
  bullet.lifetime=600;
  bullet.scale=0.1
  bullet.addImage(bulletimage);
  bullets=bullets-1;
bulletgroup.add(bullet);
}
