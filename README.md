nanodegree-arcade-game
===============================


Initial completition 

The first part of the process was to identify the variables that i will need to move the player, and the enemies.

from the video I could identify the player move between rows and columns, and the enemies just move in one direction but they have speed.

So I proceed to add the speed parameters to the enemies.
I found that it will be easier to create an object to keep the values of the stage, like the size, position of the player in the grid.

Then I create the Stage object that will help me to set the values of the stage in terms of rows and columns. Also it will keep track of the player inside the grid, so it will be easier to calculate the collisions by just evaluating one of the coordinates.

For the colliction detection i search for the most optimal an easy way to implement, and i found that circles adjust very well to what i'm trying to do, but there was a problem, the sprites used for the Player and the Enemies are not perfect centered to image, they are rectangles with a big transparent area. So i set a property in the Players and enemies to set the collision area using a Circles.






Resources
============================================
Used this url to learn the Random between to numbers in Javascript

http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript

Used this url to implement the collition detection algorithym
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection