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

    // enemies position in the stage
    this.enemies = [];
}


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.generateValues();

    this.collisionArea = { radius: 40 , x: 50 , y: 100 };
}

Enemy.prototype.generateValues = function()
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
        this.generateValues();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage( Resources.get(this.sprite) , this.x , this.y );
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function( x , y ) {
    this.sprite = 'images/char-boy.png';

    //start position
    this.x = x || 0;
    this.y = y || 0;

    //use circles as detection collision
    this.collisionArea = { radius: 30 , x: 50 , y: 110 };
}

Player.prototype.update = function( dt ){

}


Player.prototype.enemyCollision = function( enemiesArray ){
    // return true if there is no collition with any object
    for (var i = enemiesArray.length - 1; i >= 0; i--) {
        if( checkObjectCollision( this,  enemiesArray[i] ) ) {
            // Resets the players position if a collision is detected
            this.reset();

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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var stage = new Stage(  );

var allEnemies = [ new Enemy(), new Enemy(), new Enemy(), new Enemy() ];

var player = new Player( stage.cols[ stage.playerDefaultColumn ] ,
                        stage.rows[ stage.playerDefaultRow ] );


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    console.log( e.keyCode );
    player.handleInput(allowedKeys[e.keyCode]);
});
