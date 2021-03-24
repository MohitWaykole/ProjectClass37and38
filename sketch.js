//all the required variables
var player, gameState;
var distance = 0;
var enemyGroup, count = 0;
var death = 3;
var playSound;

//function to load images
function preload(){
  playerImg = loadImage("sprite_0.png");
  underWaterImg = loadImage("underwater.jpg");
  enemyImg = loadImage("sprite_3 (1).png");
  foodImg = loadImage("output-onlinepngtools (2).png");
  crocImg = loadImage("sprite_40.png");
  insImg = loadImage("output-onlinepngtools (1).png");
  CrocGroup = new Group();
  enemyGroup = new Group();
  foodGroup = new Group();
}

function setup() {
  //creating canvas
  createCanvas(800,400);

  /*road = createSprite(590,200);
  road.addImage(underWaterImg);
  road.scale = 3.4;*/

  //sprite that display instructions of the game
  instructions = createSprite(450,200);;
  instructions.addImage(insImg);
  instructions.visible = true;

  //creating player
  player = createSprite(50, 200, 10, 10);
  player.shapeColor = rgb(54,255,87);
  player.addImage(playerImg);

  //giving value to game state
  gameState = "start";
}

function draw() {
  //giving background
  background(underWaterImg);

  //player will collide enemy
  player.collide(enemyGroup);

  //when space is pressed and game state is start the game will go to game state play
  if(keyDown("space") && gameState === "start"){
    gameState = "play";
  }

  //things that will happen in game state play
  if (gameState==="play"){
    //increasing distance according to the frame rate
    distance = distance + Math.round(getFrameRate()/40);
    //giving player velocity according to the count
    player.velocityX = (4+(count/2));
    //allowing player to move according to the mouse
    player.y = mouseY;
    //camera's x position is equal to player's x + 300
    camera.x = player.x+300;
    //making instructions sprite visible false
    instructions.visible = false;

    //text to display lives
    fill("white");
    textSize(40);
    text("Lives: "+death,player.x+250,50);

    //if crocodile is touching player live equals to live -1 and destroy crocodile.
    if (CrocGroup.isTouching(player)){
      death = death - 1;
      CrocGroup.destroyEach();
    }

    //if lives = 0 game state will change to end.
    if (death === 0){
      gameState = "end";
    }

    //text to display distance we traveled.
    textSize(30);
    fill("white");
    text("Distance: "+distance,player.x,player.y-40);


    //calling functions name.
    spawnEnemy();
    spawnCroc();
    spawnFood();
  }

  //to draw sprites.
  drawSprites();

  //if game state is start to display text that display what to do to start the game. 
  if (gameState === "start"){
    textSize(40);
    fill("white");
    text("Press Space To Start", 280, 200);
  }

  //things that will happen in game state end.
  if (gameState == "end"){
    player.destroy();
    enemyGroup.destroyEach();
    foodGroup.destroyEach();
    CrocGroup.destroyEach();
    textSize(40);
    fill("white");
    text("Game Over!!",player.x+200,player.y);
  }
}

function spawnEnemy(){
  //to create enemy at every 40th frame.
  if (frameCount%40==0){
    enemy = createSprite(random(player.x+500,player.x+1000), random(30,370), 10, 10);
    enemy.shapeColor = rgb(45,82,62);
    enemy.addImage(enemyImg);
    enemy.liftime=100;
    enemyGroup.add(enemy);
    if (foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      count = count + 1;
    }
  }
}

function spawnFood(){
  //creating food at 300th frame.
  if (frameCount%300==0){
    food = createSprite(random(player.x+500,player.x+1000), random(30,370), 10, 10);
    food.shapeColor = "red";
    food.lifetime = 300;
    foodGroup.add(food);
    food.addImage(foodImg);
  }
}

function spawnCroc(){
  //creating crocodile at every 400th frame.
  if (frameCount%400==0){
    Croc = createSprite(random(player.x+500,player.x+1000), mouseY, 100, 10);
    Croc.shapeColor = "white";
    Croc.lifetime = 300;
    CrocGroup.add(Croc);
    Croc.scale=0.6;
    Croc.addImage(crocImg);
  }
}