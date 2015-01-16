frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.


The first part of the process was to identify the variables that i will need to move the player, and the enemies.

from the video I could identify the player move between rows and columns, and the enemies just move in one direction but they have speed.

So I proceed to add the speed parameters to the enemies.
I found that it will be easier to create an object to keep the values of the stage, like the size, position of the player in the grid.

Then I create the Stage object that will help me to set the values of the stage in terms of rows and columns. Also it will keep track of the player inside the grid, so it will be easier to calculate the collisions by just evaluating one of the coordinates.

