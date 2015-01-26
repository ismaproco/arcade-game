// The Stage where the player and enemies are.
var Stage = function(  ){
    // set the size in pixels of the stage
    this.width = 500;
    this.height = 500;

    

    //set the rows porperties
    this.rows = [];
    numRows = 6;
    var rowsbase = 77;

    //set the cols porperties
    this.cols = [];
    numCols = 5;
    var colsbase = 100;

    // calculate and add the value to the stage rows
    for (var i = 0; i < numRows; i++) {
        this.rows[i] = rowsbase * i;
    };

    // calculate and add the value to the stage cols
    for (var i = 0; i < numCols; i++) {
        this.cols[i] = colsbase * i;
    };


    // player position in the stage
    this.playerDefaultRow = 5;
    this.playerDefaultColumn = 2;

    // player position in the stage
    this.playerRow = this.playerDefaultRow;
    this.playerColumn = this.playerDefaultColumn;

    // player initial values
    this.playerStarterlifes = 3;


    // enemies position in the stage
    this.enemies = [];

    // game status: "start, active, game over"
    this.status = 'start';
}

var Dashboard = function(initialLifes) {
    // size variables
    this.height = 536;
    this.width = 290;

    // position variables
    this.x = 505;
    this.y = 50;

    this.titlePosition =    { x: 505, y: 100, width: this.width, height: 30 };
    this.lifesPosition =    { x: 505, y: 125, width: this.width , height: 30 };
    this.messagesPosition = { x: 505, y: 125, width: this.width , height: 30 };

    // life's variables
    this.initialLifes = initialLifes || 3;
    this.currentLifes = 0;

    //score's variables
    this.score = 0;

    //status's variables
    this.status = 'start';
}

Dashboard.prototype.update = function( dt ) {
    // update the number of lifes with the player remaining lifes
    this.currentLifes = player.lifes;

    //update the Dashboard status with the Stage status
    this.status = stage.status;
}

Dashboard.prototype.render = function() {

    // draw background
    // set the background color
    ctx.fillStyle="#fff";
    ctx.fillRect( this.x , this.y , this.width , this.height );
    ctx.fillStyle="#000000";
    ctx.fillRect( this.x + 7, this.y , this.width , this.height );


    // draw game title
    ctx.textAlign="center";
    ctx.fillStyle = "#FF7E00";
    ctx.font = "bold 28px Courier";
    ctx.fillText("Nano Frogger", this.titlePosition.x + ( this.titlePosition.width / 2 )
                         , this.titlePosition.y );

    switch( this.status )
    {
        case 'start':

            // draw number of lives
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Press <Enter> to Start", 
                        this.messagesPosition.x + ( this.messagesPosition.width / 2 )
                        , this.messagesPosition.y + 150 );

        break;
        case 'active':

            // draw number of lives
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Remaining lives: " + 
                        this.currentLifes + " of " + this.initialLifes,
                        this.lifesPosition.x + ( this.lifesPosition.width / 2 )
                        , this.lifesPosition.y  );


            // draw the texts of the dashboard

            // draw the score title

            // draw the score value    

        break;
        case 'game over':
            // draw number of lives
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Game Over", this.messagesPosition.x +
                        ( this.messagesPosition.width / 2 )
                        , this.messagesPosition.y + 150 );
            ctx.fillText("Press <Enter> to try again", this.messagesPosition.x +
                        ( this.messagesPosition.width / 2 )
                        , this.messagesPosition.y + 180 );
        break;
    }

}



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // generate the movement values for each of the enemies
    this.generateMovementValues();

    this.collisionArea = { radius: 40 , x: 50 , y: 100 };
}

Enemy.prototype.generateMovementValues = function()
{
    // set one the position of the enemy randomly to one of
    // the rows.
    this.x = -30;

    //get the random row
    this.y = stage.rows[ Math.floor(Math.random() * 3) + 1 ];

    //add the speed property
    this.speed = Math.floor(Math.random() * 5) + 1;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function( dt ) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+= this.speed;

    // the width limit is reach?
    if( this.x > stage.width )
    {
        this.generateMovementValues();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage( Resources.get(this.sprite) , this.x , this.y );
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function( x , y , lifes) {
    this.sprite = 'images/char-boy.png';

    //start position
    this.x = x || 0;
    this.y = y || 0;

    //use circles as detection collision
    this.collisionArea = { radius: 30 , x: 50 , y: 110 };

    //count the number of collisions.
    this.collisionNumber = 0;

    // player lifes
    this.lifes = lifes || 3;

    // player score
    this.score = 0;
}

Player.prototype.update = function( dt ){
    if( this.lifes === 0 ) {
        stage.status = 'game over';
        
        // show an action color in a Game Over
        backgroundActionColor('red');
    }
}


Player.prototype.enemyCollision = function( enemiesArray ){
    // return true if there is no collition with any object
    for (var i = enemiesArray.length - 1; i >= 0; i--) {
        if( checkObjectCollision( this,  enemiesArray[i] ) ) {
            // Resets the players position if a collision is detected
            this.lifes--;
            this.reset();

            // show an action color when a collision is detected
            backgroundActionColor('yellow');

            break;
        }
    }
}

Player.prototype.reset = function (  ) {

    // player position in the stage
    stage.playerRow = stage.playerDefaultRow;
    stage.playerColumn = stage.playerDefaultColumn;

    this.x = stage.cols[ stage.playerDefaultColumn ];
    this.y = stage.rows[ stage.playerDefaultRow ];
}

var checkObjectCollision = function ( object1, object2 )
{
    var dx = (object1.collisionArea.x + object1.x + object1.collisionArea.radius) 
            - (object2.collisionArea.x + object2.x + object2.collisionArea.radius);
    
    var dy = (object1.collisionArea.y + object1.y + object1.collisionArea.radius) 
            - (object2.collisionArea.y + object2.y + object2.collisionArea.radius);

    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < object1.collisionArea.radius + object2.collisionArea.radius) {
        // collision detected!
        return true;
    }
}


Player.prototype.render = function( dt ){
    var sprite = Resources.get(this.sprite);
    ctx.drawImage( sprite , this.x, this.y);
}

Player.prototype.handleInput = function( input ){

    var startInput = function( input ) {
        switch(input)
        {
            case 'enter':
                stage.status = 'active';
            break;
        }
    };

    var activeInput = function( input ) {
        switch(input)
        {
            case 'left':
                if( stage.playerColumn - 1 > -1 )
                {
                    stage.playerColumn--;
                    player.x = stage.cols[ stage.playerColumn ];    
                }
            break;
            case 'right':
                if( stage.playerColumn + 1 < stage.cols.length )
                {
                    stage.playerColumn++;
                    player.x = stage.cols[ stage.playerColumn ];
                }
            break;
            case 'up':
                if( stage.playerRow - 1 > -1 )
                {
                    stage.playerRow--;
                    player.y = stage.rows[ stage.playerRow ];    
                }
            break;
            case 'down':
                if(stage.playerRow + 1  <  stage.rows.length )
                {
                    stage.playerRow++;
                    player.y = stage.rows[ stage.playerRow ];    
                }
            break;
        }
    };


    var gameOverInput = function( input ) {
        switch(input)
        {
            case 'enter':
                //reset game to the initial values
                initializeGame();
                //put the game in active state
                stage.status = 'active';
            break;
        }
    };

    switch( stage.status )
    {
        case 'start':
            startInput( input );
        break;
        case 'active':
            activeInput( input );
        break;
        case 'game over':
            gameOverInput( input );
        break;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var stage;
var allEnemies;
var player;
var dashboard;

function initializeGame()
{
    //Create the game stage
    stage = new Stage(  );

    //Create the enemies
    allEnemies = [ new Enemy(), new Enemy(), new Enemy(), new Enemy() ];

    //Create the game player
    player = new Player( stage.cols[ stage.playerDefaultColumn ] ,
                        stage.rows[ stage.playerDefaultRow ] ,
                        stage.playerStarterlifes );

    //Create the dashboard to show information
    dashboard = new Dashboard( stage.playerStarterlifes );

    document.bgColor = 'white';
}


function backgroundActionColor( toColor )
{
    // change the background color when a collision is detected
    document.bgColor = toColor;

    // after 200 millis the background goes back to the original color
    setTimeout(function(){
        document.bgColor = 'white';                
    }, 200 );
}


// start the game variables
initializeGame();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
