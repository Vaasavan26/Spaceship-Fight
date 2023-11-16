var score = 0;

var ball, bullet, bulletIcon, enemy, enemyBullet, explosive, heart, player;

var ballImg, bulletImg, bulletIconImg, enemyImg, enemyBulletImg, explosiveImg, heartImg, playerImg;

var background, backgroundImg;

var life = 5;

var score = 0;

var gameState = 1;

function preload() {
    bulletImg = loadImage("assets/bullet.png");
    bulletIconImg = loadImage("assets/bulleticon.png");
    enemyImg = loadImage("assets/enemy.png");
    enemyBulletImg = loadImage("assets/enemybullet.png");
    explosiveImg = loadImage("assets/explosive.png")
    heartImg = loadImage("assets/heart.png");
    playerImg = loadImage("assets/spaceship.png");
    backgroundImg = loadImage("assets/background.jpg");
}

function setup() {
    createCanvas(1000,600);

    player = createSprite(500,525,75,75);
    player.addImage(playerImg);
    player.scale=0.2;
    player.setCollider("rectangle",0,0,200,600)

    bulletGroup = new Group();
    explosiveGroup = new Group();
    enemyGroup = new Group();
}

function draw () {
    background(backgroundImg);
    edges = createEdgeSprites();

    textSize(25)
    fill("white")
    text("Lives: "+life,900,30)

    textSize(25)
    fill("white")
    text("Score: "+score,25,30)

    if(gameState===1){

        enemyGroup.bounceOff(edges);
        player.x=mouseX

        if(keyWentDown("space")){
            fireBullet();
        }

    if(enemyGroup.isTouching(bulletGroup)){
        for(var i=0;i<enemyGroup.length;i++)
            if(enemyGroup[i].isTouching(bulletGroup)){
                score=score+1;
                enemyGroup[i].destroy();
                bulletGroup.destroyEach()
            }
    }

    if(explosiveGroup.isTouching(player)){
        for(var i=0;i<explosiveGroup.length;i++)
        if(explosiveGroup[i].isTouching(player)){
            life=life-1;
            explosiveGroup[i].destroy();
        }
    }
        if(frameCount % 60 === 0)
        spawnEnemy();
 
        if(score===25){
            gameState="WIN"
        }

        if(life===0){
            gameState="LOSE"
        }

        setTimeout(fireExplosive,5000);
    }

    if(gameState==="WIN"){
        textSize(150)
        fill("green")
        text("You Win",200,300)
    }

    if(gameState==="LOSE"){
        textSize(150)
        fill("red")
        text("Game Over",125,300)
    }

    drawSprites();
}

function fireBullet() {
    bullet = createSprite(player.x,player.y)
    bullet.addImage(bulletImg)
    bullet.scale = 0.1
    bullet.velocityY = -15
    bulletGroup.add(bullet)
    bullet.setCollider("rectangle",0,0,100,200)

    player.depth = bullet.depth
    player.depth = player.depth + 1
}

function fireExplosive() {
    if(frameCount % 10 === 0){
    explosive = createSprite(random(0,1000),50)
    explosive.addImage(explosiveImg)
    explosive.scale = 0.05
    explosive.velocityY = 5
    explosiveGroup.add(explosive)

    explosive.setCollider("circle",-250,250,500)

    enemy.depth = explosive.depth
    enemy.depth = enemy.depth + 1
    }
}

function spawnEnemy() {
    enemy = createSprite(500,50,25,25);
    enemy.addImage(enemyImg);
    enemy.scale=0.2;
    enemy.setCollider("rectangle",0,0,300,500);
    enemyGroup.add(enemy);
    enemy.velocityX = random(-50,50);
}