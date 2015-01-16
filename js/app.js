// The Stage where the player and enemies are.
var Stage = function(  ){
    // set the size in pixels of the stage
    this.width = 500;
    this.height = 500;

    //set the rows porperties
    this.rows = [];
    numRows = 6;
    var rowsbase = 75;

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
    this.playerRow = 5;
    this.playerColumn = 2;

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
}

Player.prototype.update = function( dt ){

}

Player.prototype.render = function( dt ){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

var allEnemies = [ new Enemy(), new Enemy(), new Enemy() ];

var player = new Player( stage.cols[ stage.playerColumn ] ,
                        stage.rows[ stage.playerRow ] );

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
