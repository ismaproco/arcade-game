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

// Update the player value 
Player.prototype.update = function( dt ){
    
}


Player.prototype.enemyCollision = function( enemiesArray ){
    // return true if there is no collition with any object
    for (var i = enemiesArray.length - 1; i >= 0; i--) {
        if( checkObjectCollision( this,  enemiesArray[i] ) ) {
            
            // decrease the remaining lifes
            this.lifes--;
            //decrease the score
            this.score-=50;
            // Resets the players position if a collision is detected
            this.reset();
            // show an action color when a collision is detected
            backgroundActionColor('yellow');

            break;
        }
    }
}

// collectibles collision detection
Player.prototype.collectiblesCollision = function( collectiblesArray ){

    // return true if there is no collition with any object
    for (var i = collectiblesArray.length - 1; i >= 0; i--) {
        if( checkObjectCollision( this,  collectiblesArray[i] ) ) {
            // Increase the score
            this.score+=collectiblesArray[i].score;

            // show an action color when a collision is detected
            backgroundActionColor(collectiblesArray[i].type);

            // create a new position and type for the collectible
            collectiblesArray[i].setRandomPosition();
            collectiblesArray[i].setRandomType();

            break;
        }
    }
}

// Reset the position of the player
Player.prototype.reset = function (  ) {

    // player position in the stage
    stage.playerRow = stage.playerDefaultRow;
    stage.playerColumn = stage.playerDefaultColumn;

    // calculate the position based in the columns and rows
    this.x = stage.cols[ stage.playerDefaultColumn ];
    this.y = stage.rows[ stage.playerDefaultRow ];
}

// render de player
Player.prototype.render = function( dt ){
    var sprite = Resources.get(this.sprite);
    ctx.drawImage( sprite , this.x, this.y);
}

// handle the player input
Player.prototype.handleInput = function( input ){

    // input for the start state
    var startInput = function( input ) {
        switch(input)
        {
            case 'enter':
                stage.status = 'active';
                //start the dashboard timer
                dashboard.startTimer();
            break;
        }
    };

    // input for the active state
    //
    // validate the player movement using the arrow's keys directions
    // check the current column and row so the player will not get out of bounds
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

    // input for the game over state
    var gameOverInput = function( input ) {
        switch(input)
        {
            case 'enter':
                // reset game to the initial values
                initializeGame();
                // put the game in active state
                stage.status = 'active';
                //start the dashboard timer
                dashboard.startTimer();
            break;
        }
    };

    //change the player input based in the stage status
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