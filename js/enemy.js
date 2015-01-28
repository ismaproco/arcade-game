// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.spriteFast = 'images/enemy-bug-fast.png';
    this.spriteMagnetic = 'images/enemy-bug-magnetic.png';

    // generate the movement values for each of the enemies
    this.generateMovementValues();

    //set the collision area of the enemy
    this.collisionArea = { radius: 40 , x: 50 , y: 100 };
}

// create the enemy in one of the rows, with a random speed
Enemy.prototype.generateMovementValues = function()
{
    // set the initial x position to -30 so the enemy will be shown
    // getting into the stage
    this.x = -30;
    // set one the position of the enemy randomly to one of
    // the rows.
    
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
    // change the enemy sprite based on the enemy speed
    if ( this.speed < 3 ) {
        ctx.drawImage( Resources.get(this.sprite) , this.x , this.y );    
    }
    else if( this.speed < 5) {
        ctx.drawImage( Resources.get(this.spriteMagnetic) , this.x , this.y );    
    }
    else {
        ctx.drawImage( Resources.get(this.spriteFast) , this.x , this.y );    
    };
}