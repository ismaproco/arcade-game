var Collectible = function Collectibles ( type ) {
	// array with the collectibles sprites
	this.sprites = ['images/Gem Blue.png',
					'images/Gem Orange.png',
					'images/Gem Green.png'];

	// array with the collectibles values
	this.points = [ 100, 200, 1000 ];

	// collectible position
	this.row = 0;
	this.column = 0;

	this.type = type || 'blue';
}


Collectible.prototype.getPosition = function getPosition( ) {
	// select random column between 1 - 5
	// select random column between 1 - 2
}

Collectible.prototype.render = function render( ) {
	// render collectible using the stage calculation
}

Collectible.prototype.update = function update( dt ) {
	// rotate the collectible in function of time
}
