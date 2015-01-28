nanodegree-arcade-game
===============================


Initial completition 

The first part of the process was to identify the variables that i will need to move the player, and the enemies.

from the video I could identify the player move between rows and columns, and the enemies just move in one direction but they have speed.

So I proceed to add the speed parameters to the enemies.
I found that it will be easier to create an object to keep the values of the stage, like the size, position of the player in the grid.

Then I create the Stage object that will help me to set the values of the stage in terms of rows and columns. Also it will keep track of the player inside the grid, so it will be easier to calculate the collisions by just evaluating one of the coordinates.

For the colliction detection i search for the most optimal an easy way to implement, and i found that circles adjust very well to what i'm trying to do, but there was a problem, the sprites used for the Player and the Enemies are not perfect centered to image, they are rectangles with a big transparent area. So i set a property in the Players and enemies to set the collision area using a Circles.

Reset the player position when a collision is detected, the player position is stored in the stage, and there is a default position, so the reset will determine the right location for the reset.



#Extra Mile!

- Create a dashboard to show the game status, score and lifes
This was done using a Dashboard class to manage all the game information.

- Create a player life counter indicator, the player start with a number of lifes and they decrease if  a collision is detected.
This was done using a player property indicating the number of lifes, and this property was read by the Dashboard and the information its shown in it.

- Create a start, active and game over status, and block the input of other keys aside from enter.
In the dashboard the stage status is checked, and the screen show relevant information for each one of the statuses.

- Add a score increment if the player collect any of the collectibles, each gem will increment the player score.

- Create more enemies that move faster that the others, each anemy will have an specific sprite, depending of the speed.

- Add a time counter once the game start, if the counter reach 0 seconds left the game is over.

#Live Demo
http://chitomsa.com/arcade

Resources
============================================
Used this url to learn the Random between to numbers in Javascript

http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript

Used this url to implement the collition detection algorithym
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

Image rotation in html5 canvas
http://www.html5canvastutorials.com/advanced/html5-canvas-transform-rotate-tutorial/
