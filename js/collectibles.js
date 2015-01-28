// Collectible class
var Collectible = function Collectibles ( type ) {
	
	// collectible position
	this.row = 0;
	this.column = 0;

	//position variables
	this.x = 0;
	this.y = 0;

	// type argument exists?
	if( type ) 
	{
		//set the type argument
		this.type = type;	
	}
	else 
	{
		//create a random type
		this.setRandomType();
	}
	
	// set random position for the collectible
	this.setRandomPosition();

	// set the collision values
	this.collisionArea = { radius: 20 , x: 50 , y: 100 };
}

// set a random position for the collectible
Collectible.prototype.setRandomPosition = function setRandomPosition( ) {
	// select random column between 0 - 4
	this.column =  parseInt( Math.random() * 5 );

	// select random number between 1 - 10
	// if the number is greater lower than 5
	// it will be in the first column, if greater than 5
	// it will be in the fourth
	this.row =  ( parseInt( Math.random() * 11 )  > 5 ) ? 0 : 4;
}

// set a random type for the collectible
Collectible.prototype.setRandomType = function setRandomType( ) {

	// array with the collectibles sprites
	var sprites = ['images/Gem Blue.png' ,
					'images/Gem Orange.png' ,
					'images/Gem Green.png' ];

	// array with the collectibles values
	var scores = [ 100, 200, 300 ];

	// select random number between 0 - 3
	// and use the number to select a type
	switch( parseInt( Math.random() * 3 ) )
	{
		case 0:
			this.type = 'blue';
		break;
		case 1:
			this.type = 'orange';
		break;
		case 2:
			this.type = 'green';
		break;
	}

	//set the sprite and score based on the type
	switch( this.type )
	{
		case 'blue':
			this.sprite = sprites[0];
			this.score = scores[0];
		break;
		case 'orange':
			this.sprite = sprites[1];
			this.score = scores[1];
		break;
		case 'green':
			this.sprite = sprites[2];
			this.score = scores[2];
		break;
	}
}

// render the collectible
Collectible.prototype.render = function render( ) {
	// set the position of the collectible
	this.x = stage.cols[this.column] + 25;
	this.y = stage.rows[this.row] + 45;

	// render collectible using the stage calculation
	ctx.drawImage( Resources.get(this.sprite) , this.x ,this.y , 50, 85 );
}

// update the collectible
Collectible.prototype.update = function update( dt ) {
	
}
