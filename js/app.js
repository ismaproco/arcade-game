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
    this.playerStarterlifes = 7;


    // enemies position in the stage
    this.enemies = [];

    // game status: "start, active, game over"
    this.status = 'start';

    // page ground color
    this.pageBackgroundColor = 'white';
}

var checkObjectCollision = function ( object1, object2 )
{
    var dx = (object1.collisionArea.x + object1.x 
                        + object1.collisionArea.radius) 
            - (object2.collisionArea.x + object2.x 
                        + object2.collisionArea.radius);
    
    var dy = (object1.collisionArea.y + object1.y 
                        + object1.collisionArea.radius) 
            - (object2.collisionArea.y + object2.y 
                        + object2.collisionArea.radius);

    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < object1.collisionArea.radius 
                + object2.collisionArea.radius) {
        // collision detected!
        return true;
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

    // initialize the background color of the page
    document.bgColor = stage.pageBackgroundColor;
}

// change the document background and then return back to the original color
function backgroundActionColor( toColor )
{
    // change the background color when a collision is detected
    document.bgColor = toColor;

    // after 200 millis the background goes back to the original color
    setTimeout(function(){
        document.bgColor = stage.pageBackgroundColor;                
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
