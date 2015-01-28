var Dashboard = function(initialLifes) {
    // size variables
    this.height = 536;
    this.width = 290;

    // position variables
    this.x = 505;
    this.y = 50;

    this.titlePosition =    { x: 505, y: 100, width: this.width, height: 30 };
    this.lifesPosition =    { x: 505, y: 150, width: this.width , height: 30 };
    this.messagesPosition = { x: 510, y: 125, width: this.width , height: 30 };
    this.scorePosition =    { x: 505, y: 200, width: this.width , height: 30 };
    this.timerPosition =    { x: 505, y: 250, width: this.width , height: 30 };

    // life's variables
    this.initialLifes = initialLifes || 3;
    this.currentLifes = 0;

    //score's variables
    this.score = 0;

    //status's variables
    this.status = 'start';

    // duration of the game in seconds
    this.timer = 30;
    this.interval;
}

// update the dashboard information
Dashboard.prototype.update = function( dt ) {
    // update the number of lifes with the player remaining lifes
    this.currentLifes = player.lifes;

    // set the game over if the player lose all the lifes
    if( player.lifes === 0 ) {
        stage.status = 'game over';
        // show an action color in a Game Over
        backgroundActionColor('red');
    }

    // set the game over if the timer is 0
    if( this.timer === 0 ) {
        stage.status = 'game over';
        // show an action color in a Game Over
        backgroundActionColor('red');
    }    

    //update the Dashboard status with the Stage status
    this.status = stage.status;
}

// start the dashboard timer
Dashboard.prototype.startTimer = function() {
    // handle the hoisting of the this parameter
    var dashboardObject = this;
    // clear all the previous intervals
    clearInterval( this.interval );
    // create interval which executes the method each second
    this.interval = setInterval(function(){
        //decrease the timer with each interval call
        dashboardObject.timer--;
    },1000);
}

// render the dashboard in screen
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
    ctx.fillText("Nano Frogger", this.titlePosition.x + 
                ( this.titlePosition.width / 2 ) , this.titlePosition.y );

    switch( this.status )
    {
        case 'start':

            // draw number of lives
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Press <Enter> to Start", 
                        this.messagesPosition.x + 
                            ( this.messagesPosition.width / 2 )
                                , this.messagesPosition.y + 150 );

        break;
        case 'active':

            // draw number of lives
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Remaining Lifes",
                        this.lifesPosition.x + ( this.lifesPosition.width / 2 )
                        , this.lifesPosition.y  );

            for (var i = 0; i < this.currentLifes; i++) {
                var sprite = Resources.get('images/Heart.png');
                ctx.drawImage( sprite , this.lifesPosition.x + 60 + (i * 25) ,
                                        this.lifesPosition.y , 20, 34);
            };

            // draw the score title

            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Score",
                        this.scorePosition.x + ( this.scorePosition.width / 2 )
                        , this.scorePosition.y  );

            // draw the score value    
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText(player.score,
                        this.scorePosition.x + ( this.scorePosition.width / 2 )
                        , this.scorePosition.y + 30 );

            // draw the timer
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText( 'Time Remaining: ' + this.timer ,
                        this.timerPosition.x + ( this.timerPosition.width / 2 )
                        , this.timerPosition.y + 30 );

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

            // draw the score title

            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText("Score",
                        this.scorePosition.x + ( this.scorePosition.width / 2 )
                        , this.scorePosition.y  );

            // draw the score value    
            ctx.textAlign="center";
            ctx.fillStyle = "white";
            ctx.font = "bold 18px Courier";
            ctx.fillText(player.score,
                        this.scorePosition.x + ( this.scorePosition.width / 2 )
                        , this.scorePosition.y + 30 );

        break;
    }
}