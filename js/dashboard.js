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