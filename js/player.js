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