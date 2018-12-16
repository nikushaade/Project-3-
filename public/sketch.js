//creating variables for the players 
var messi16; 
var ronaldo24; 
var suarez28; 
var torres30; 
var neymar18; 
var mbappe15;
var messi17; 
var coutinho8; 
var bale4; 
var eto11; 
var dybala10; 
var ramos23;
var cavani7; 
var salah26; 
var ozil19; 
var azpi3; 
var aguero1; 
var silva22; 
var asensio2; 
var hazard13;
var laca14; 
var smolov27; 
var griz12; 
var bradley6; 
var dembele9; 
var ronaldo25; 
var pedro20; 
var bartra5; 
var pepe21; 
var toliso29; 
var playerlist = [];
var refereeList = [];

//create texts/facts that will shouw up after every level
var text1 = "Fact:Cristiano Ronaldo is the leading goalscorer of UCL with 121 goals";
var text2 = "Fact:Luis Suarez has bit three different players in his career";
var text3 = "Fact:Neymar is the most expensive player at $222 million ";
var text4 = "Fact:Aguero was the youngest player to debut in Argentine league at the age of 15";
var text5 = "Fact:Griezman's celebrations are based on popular video game Fortnite";
var text6 = "Fact:Mbappe is still a teenager";
var text7 = "Fact:Pepe was once baned for three games for repeatedly kicking an opponent on the ground";
var text8 = "Fact:At some point Samuel Eto was the highest paid football player, while playing in Chechnya";
var text9 = "Mo Salah is is nicknamed The Egyptian king by the Liverpool ";
var text10 = "Aguero is nicknamed Kun, because of his childhood cartoon";
var text11 = "Fact: Lionel Messi has the most goals in a calendar year with 92 goals";

var textlist = [text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11];

//Creating the playground and the goalie 
var bg4;
var gloves;
var glovesSprite;
var margin = 45;
var players; 
var obstacles; 
var box1;
var box2;
var box3;
var ball;

//Creating game rules 
var gameLimit = 10; 
var point = 0; 
var time = 0; 
var win = 1; 

//Creating variables for game sound 
var gamesong; 
var timeRunningOut;
var passLevel; 
var mouseOver1;

//Creating variables for game dynamics and levels 
var gameTime; 
var strikerSpeed; 
var lowScore;
var yourScore = 0; 
var dataClass; 
var levels; 


//loading sounds and images for the game 
function preload() {
    bg4 = loadImage("assets/bg4.jpg");
    gloves = loadImage("assets/gloves.png");
    ball = loadImage("assets/ball.png");
    mouseOver1 = loadSound("assets/Mouseover.mp3");
	gamesong = loadSound("assets/gamesong.mp3");
	timeRunningOut = loadSound("assets/Timeout.mp3");
	passLevel = loadSound("assets/Levelpass.mp3");


    for (var i=1; i<28; i++){
        playerlist[i] = loadImage("assets/_" + i + ".png");  
    }

}

function getAllData(){
    $.ajax({
        url: '/api/all',
        type: 'GET',
        datatype: 'json',
        error: function(resp){
            console.log("no");
            console.log(resp);
        },
        success: function(resp){
            console.log('yes!');
            console.log(resp);

            dataClass = resp.map(function(d){
               return d.doc;
            });

            dataClass = _.sortBy(dataClass, function(obj){ 
            	return obj.score;
            });
            dataClass.reverse();
            console.log("here" + dataClass);


            for (var i = 0; i < 10; i++){
                console.log("");
            }
            lowScore = dataClass[9].score;
            console.log(lowScore);
        }
    });
}

getAllData();
  
//create game setting 
function setup(){
    createCanvas(1200, 500);
    gamesong.loop(); 
    createLevel();
    glovesSprite = createSprite();
    glovesSprite.addImage(gloves);

     obstacles = new Group();

      box1 = createSprite(random(0, width), random(0, height));
        box1.addAnimation('different', "assets/ref1.png");
        box1.setCollider('rectangle', 0, 50, 100, 100);
        box1.scale =  box1.mass;
        // box1.mass = random(1, 1.2);
        obstacles.add(box1);

        box2 = createSprite(random(100, width), random(100, height));
        box2.addAnimation('different', "assets/ref1.png");
        box2.setCollider('rectangle', 0, 50, 100, 100);
        box2.scale =  box2.mass;
        // box2.mass = random(1, 1.2);
        obstacles.add(box2);

        box3 = createSprite(random(0, width), random(0, height));
        box3.addAnimation('different', "assets/ref1.png");
        box3.setCollider('rectangle', 0, 50, 100, 100);
        box3.scale =  box3.mass;
        // box2.mass = random(1, 1.2);
        obstacles.add(box3);

}

//creating and re-doing new levels (increase speed, change timing, reset player)
function createLevel(outcome){ 
	
    if (outcome == "newLevel"){
        passLevel.play();
        console.log("Win");
        gameLimit = gameLimit - 1; 
        strikerSpeed = strikerSpeed + 2.1;
        levels = levels + 1; 
    }
    else{
        //Restart 
        levels = 1;
        point = 0;
        gameLimit = 10;
        strikerSpeed = 4;
    }
    mouseOver1.play();
    timeRunningOut.play();
    win = 1; 
    time = 0;
    gameTime = 10;
    noCursor();
  

	//A Group to contain all the sprites in the sketch.
    players = new Group();
    
    for( var i=1; i<28; i++){
        var newPlayer = createSprite(random(0, width), random(0, height));
        newPlayer.addImage("normal" , playerlist[i]);
        newPlayer.setSpeed((4, strikerSpeed), random(0, 360));
        newPlayer.setCollider("circle", -3, 3, 50);
        newPlayer.scale = random(0.7, 0.9);
        newPlayer.mass = random(0.7, 0.9);
        newPlayer.restitution= 0.9; 
        players.add(newPlayer);
 }


}

function draw(){

    currentprog();
    background(255);
    image(bg4, 0, 0);
    potentialwinner();
    
}

// Indicating current progress of the game 
function currentprog(){ 
       textSize(25);
       textFont("Papyrus");
       fill(255, 0, 120);
       text("Current Level:" +   levels ,  width/2, height/10);
       text("Strikers stopped:" +   point ,  width-120, height-450); 
}


//determining the winner of the game 
function potentialwinner(){ 
    for (var i=0; i<players.length; i++){
        checkEdges(players[i]);
    }

    //losing a game 
    if (gameTime < 1 && win == 1){ 
        theWinner(point);
        timeRunningOut.stop();
        currentprog();
        // footyfacts();
        textSize(32);
    	fill(255, 255, 255);
    	text(textlist[levels], width/2, height/1.5); 
    }

    else {

    	glovesSprite.position.x = mouseX;
    	glovesSprite.position.y = mouseY;
    	glovesSprite.overlap(players, collect);
        glovesSprite.collide(obstacles);
    

        //check for a collision
        drawSprites();
        gameTime = gameLimit - Math.floor(time/55);
        time++;


        //game is continuing 
        if(win==1){
            textSize(45);
            textAlign(CENTER);
            fill(255, 0,0);
            text(gameTime, width/2, height - 410);
            currentprog();
        }
    }


    //level finished
    if (gameTime > 0 && players.length ==0){
        if (win==1){
            passLevel.play();
            timeRunningOut.stop(); 
            win = win + 1;
            time = 0;



            createLevel("newLevel");
             
        }
    }

}

//mouse over function for "collecting" the strikers
function collect(goalkeeper, collected){
	console.log(goalkeeper);
	console.log(collected);
	console.log(collected.playerId);


    if(gameTime > 0){
        point = point + 1; //point originally equals zero (declared in variables)
        collected.remove();
        mouseOver1.play();
    }
    else {
        point = 0;
    }

}

// function for creating edges, so that strikers are contained in certain boundaries
function checkEdges(attacker){ //used Craigs space-flyer game for referance
   if (attacker.position.x > width) {
      attacker.velocity.x = -attacker.velocity.x;
    } 
    else if (attacker.position.x < 0) {
      attacker.velocity.x = -attacker.velocity.x;
    }

    if (attacker.position.y > height) {
      attacker.velocity.y = -attacker.velocity.y;
    } 
    else if (attacker.position.y < 0) {
      attacker.velocity.y = -attacker.velocity.y;
    }
}

// function footyfacts(){
//     textSize(32);
//     fill(255, 255, 255);
//     text(text+levels, width/2, height/1.5); 
// }

//the string for the winner name to show up / after game dynamics
function theWinner(hs){
    textSize(30);
    fill(255, 0, 120);
    textAlign(CENTER);
    text("Time is up and the strikers have scored! Find out if you rank in top 10", width/2, height/4);
    image(ball, mouseX, mouseY);
    $("#inputSpace").show();
    $("#winnerB").show();
    $("#top1").show();
    yourScore = hs; 
}

$("#winnerB").click(function(){
    $("#winnerdinner").show();
    $("#inputSpace").hide();
    $("#instructions").hide();
    $("#winnerB").hide();

    var playerName = $("#winner").val();
    var data = {
        name: playerName,
        score: yourScore
    };

    saveData(data);

    if (yourScore > lowScore) {
         window.location.href = "/Hs";
    }
    else if (yourScore < lowScore) {
        var loseString = " Apologies " + playerName  + " your score of " + yourScore +  "  is not good enough for Top 10. ";
        $('#winnerdinner').html(loseString);
    }
});

$("#restartB").click(function(){
    createLevel();
    potentialwinner();
    $("#instructions").show();
    $("#winnerdinner").hide();
    $("#inputSpace").hide();
});


function saveData(obj){ //taken from Craig's main.js folder from cloudant example
    $.ajax({
        url: '/save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        error: function(resp){
            console.log("Oh no...");
            console.log(resp);
        },
        success: function(resp){
            console.log('WooHoo!');
            console.log(resp);
            var htmlString = '<li>' + obj.user + ' : ' + obj.word + '</li>';
            $('ol').append(htmlString);

        }
    });
}
