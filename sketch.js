var cheems, cheems_running, edges;
var groundImage, ground, sueloinvisible;
var bg, bg2;
var planeta1, planeta2, planeta3, planeta4;
var explosionAnimacion, explosion, banderaLC=0;
var a1, a2, a3, a4, a5, a6;
var score = 0;
var numerorandom = 60, banderaAlien = 0;
var planetsGroup, aliensGroup;
var botonImg, botonSprite;
var MENU = 0;
var PLAY = 1;
var END = 2;
var logoImg, logoSprite;
var gamestate = MENU;
var songmenu, songmenub=0;
var songplay, songplayb=0;
var soundJump, soundCollided;
var bobcry;

function preload(){
  cheems_running = loadAnimation("cheems4.png","cheems2.png","cheems3.png");
  groundImage = loadImage("ground2.png"); 
  bg = loadImage("fondoEspacio2.png");
  bg2 = loadImage("bg2.jpg");
  botonImg = loadImage("botonplay.png");
  planeta1 = loadImage("planeta1.png");
  planeta2 = loadImage("Planeta2.png");
  planeta3 = loadImage("Planeta3.png");
  planeta4 = loadImage("planeta4.png");
  a1 = loadImage ("A1.png")
  a2 = loadImage ("A2.png")
  a3 = loadImage ("A3.png")
  a4 = loadImage ("A4.png")
  a5 = loadImage ("A5.png")
  a6 = loadImage ("A6.png")
  explosionAnimacion = loadAnimation("remolino.png");
  logoImg = loadImage ("BobTheSpaceDogLogo.png")
  songmenu = loadSound ("bobthespacedogsongmenu.mp3");
  songplay = loadSound ("bobthespacedogsongplay.mp3");
  soundJump = loadSound("jump.wav");
  soundCollided = loadSound("collided.wav");
  bobcry = loadImage ("cheemsCry.png");
}

function setup(){
  createCanvas(600,200);
  //suelo
  ground = createSprite (200,180, 400, 20);
  ground.addImage ("ground",groundImage);
  sueloinvisible = createSprite (200,210, 400, 20);
  
  
  //crea el Personaje Cheems
  cheems = createSprite(50,160,20,50);
  cheems.addAnimation("running", cheems_running);
  cheems.addAnimation("explosion", explosionAnimacion);
  //añade escala y posición al Trex
  cheems.scale = 0.09;
  cheems.x = 50;
  cheems.debug = false;
  cheems.setCollider("circle", -100,0,400);
  
  //limites
  edges = createEdgeSprites();
  
  //grupos
  planetsGroup = new Group();
  aliensGroup = new Group();
  
  //boton play
  botonSprite = createSprite(300,130,50,50);
  botonSprite.addAnimation("play", botonImg);
  botonSprite.scale = 0.1;
  
  //logo del juego
  logoSprite = createSprite(320,70, 50, 50);
  logoSprite.addAnimation("logo", logoImg);
  logoSprite.scale = 0.2;
  
}


function draw(){
  if(gamestate === MENU){
     background(bg2);
    if(songmenub === 0){
      songmenu.play();
      songmenub = 1;
    }
    
    botonSprite.visible = true; 
    cheems.visible = false;
    ground.visible = false;
  
    if(mousePressedOver(botonSprite)){
      gamestate = PLAY;
      songmenu.stop();
      songmenub = 0;
    }
    
  }
  else if(gamestate === PLAY){
     //establece un color de fondo 
    background(bg);
if(songplayb===0){
   songplay.play()
  songplayb =1
}
    botonSprite.visible = false; 
    cheems.visible = true;
    logoSprite.visible = false;
    ground.visible = true;
    
     //CHEEMS SALTA
  if(keyDown("space") && banderaLC === 0){
    cheems.velocityY = -5;
    soundJump.play();
  }
  //GRAVEDAD
  cheems.velocityY = cheems.velocityY + 0.5;
  
  //CUANDO VUELA MUY ALTO
  if (cheems.y < 0) {
    fill("white")
    text ("YOU LOSE THE CONTROL!!!",220 , 50);
    text ("You lose :(", 270, 70);
    cheems.visible = false;
    gamestate = END
    songplay.stop()
    songplayb = 0
  }
    
  if(cheems.y > 160){
    cheems.changeAnimation("running", cheems_running);
    }
  
    //VELOCIDAD DEL SUELO
  ground.velocityX = -(4+2*score/500);
  //SUELO SE REAJUSTA
  if(ground.x <0){
    ground.x = ground.width / 2;
  }
  
  //CHEEMS CHOCA CON SUELO INVISIBLE
  cheems.collide(sueloinvisible);
  
  //CREAR PLANETAS
  spawnPlanets();
  
  //CREAR ALIENS
  if(banderaAlien === 0){
    numerorandom = Math.round(random(50,150));
    banderaAlien = 1;
  }
  if(numerorandom === 0 ){
    spawnAliens();
    banderaAlien = 0;
  }
  else{
    numerorandom--;
  }
    
    //DETECTA CHOQUE DE ALIENS
    if(aliensGroup.isTouching(cheems)){
      gamestate=END
      soundCollided.play();
          fill("white")
          text ("HOUSTON WE HAVE A PROBLEM!!!",200 , 50);
    text ("You lose :(", 270, 70);
      cheems.addAnimation ("cry",bobcry)
      cheems.changeAnimation ("cry",bobcry)
    songplay.stop()
    songplayb = 0
    }
   
    //CALCULA EL SCORE
  score = score+Math.round (getFrameRate()/60);
    
  }
   else if(gamestate === END){
    aliensGroup.setVelocityXEach(0);
    planetsGroup.setVelocityXEach(0);
     
    aliensGroup.setLifetimeEach(-1);
    planetsGroup.setLifetimeEach(-1);
     
    ground.velocityX = 0
    cheems.velocityY = 0;
    logoSprite.visible = false;
     
    //MUESTRA BOTON PLAY
     botonSprite.visible = true;
     if(mousePressedOver(botonSprite)){
       reset ();
    }
     
  }
  //MUESTRA SCORE EN PANTALLA
  text("score: "+score,500, 30)
  
  drawSprites();
}

function spawnPlanets(){
 if(frameCount%500  === 0){
  var Planet1 = createSprite (650, 80, 40, 10)
  var numero = Math.round(random(1,4))
  switch (numero){
    case 1:Planet1.addImage (planeta1)
    break;
    case 2:Planet1.addImage (planeta2)
    break;
    case 3:Planet1.addImage (planeta3)
    break;
    case 4:Planet1.addImage (planeta4)
    break;
  }
  
  Planet1.scale = 0.1
  Planet1.y = Math.round (random(10, 80))
  Planet1.depth = cheems.depth 
  cheems.depth = cheems.depth +1 
  Planet1.velocityX = -1;
  Planet1.lifetime = 650;
   
  planetsGroup.add(Planet1);
   
 }
}

function spawnAliens(){
  var Alien = createSprite (650, 140, 40, 10)
  Alien.collide(sueloinvisible);
  var numero = Math.round(random(1,6))
  switch (numero){
    case 1:Alien.addImage (a1)
    Alien.y = 160
    break;
    case 2:Alien.addImage (a2)
    Alien.y = Math.round(random(60,140));
    break;
    case 3:Alien.addImage (a3)
    Alien.y = 160
    break;
    case 4:Alien.addImage (a4)
    Alien.y = 145
    break;
    case 5:Alien.addImage (a5)
    Alien.y = 145
    break;
    case 6:Alien.addImage (a6)
    Alien.y = 135
    break;
  }
  
  Alien.scale = 0.2
  Alien.depth = cheems.depth 
  cheems.depth = cheems.depth +1 
 
  Alien.velocityX = -(4+2*score/500)
  Alien.lifetime = 400;
  
  aliensGroup.add(Alien); 
  
}

function reset (){
  //destruir alien y planetas destroyEach()
  planetsGroup.destroyEach()
  aliensGroup.destroyEach()
  //score se reinicia
  score = 0
  //oculta boton play y gameover
  cheems.y = 160
  cheems.visible = true
  //cambia animacion
  cheems.changeAnimation ("running", cheems_running);
  gamestate = PLAY;
}

