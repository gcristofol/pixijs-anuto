function hitTestRectangle(r1, r2) {
  // taken form tutorlal
  // https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function

//Define the variables we'll need to calculate
var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

//hit will determine whether there's a collision
hit = false;
var pos1 = r1.getGlobalPosition();
var pos2 = r2.getGlobalPosition();

//Find the center points of each sprite
r1.centerX = pos1.x + r1.width / 2;
r1.centerY = pos1.y + r1.height / 2;
r2.centerX = pos2.x + r2.width / 2;
r2.centerY = pos2.y + r2.height / 2;

//Find the half-widths and half-heights of each sprite
r1.halfWidth = r1.width / 2;
r1.halfHeight = r1.height / 2;
r2.halfWidth = r2.width / 2;
r2.halfHeight = r2.height / 2;

//Calculate the distance vector between the sprites
vx = r1.centerX - r2.centerX;
vy = r1.centerY - r2.centerY;

//Figure out the combined half-widths and half-heights
combinedHalfWidths = r1.halfWidth + r2.halfWidth;
combinedHalfHeights = r1.halfHeight + r2.halfHeight;

//Check for a collision on the x axis
if (Math.abs(vx) < combinedHalfWidths) {

  //A collision might be occuring. Check for a collision on the y axis
  if (Math.abs(vy) < combinedHalfHeights) {

    //There's definitely a collision happening
    hit = true;
  } else {

    //There's no collision on the y axis
    hit = false;
  }
} else {

  //There's no collision on the x axis
  hit = false;
}

//`hit` will be either `true` or `false`
return hit;
};

  
//TODO use pixijs utilities
function distanceBetweenPositions(positionSprite1, positionSprite2) {
  var a = positionSprite1.x - positionSprite2.x;
  var b = positionSprite1.y - positionSprite2.y;
  return Math.sqrt(a * a + b * b);
}

    /*
    distance
    ----------------
  
    Find the distance in pixels between two sprites.
    Parameters: 
    a. A sprite object. 
    b. A sprite object. 
    The function returns the number of pixels distance between the sprites.
  
       let distanceBetweenSprites = gu.distance(spriteA, spriteB);
  
    */
  
   function distanceBetweenSprites(s1, s2) {
      let vx = (s2.x + this._getCenter(s2, s2.width, "x")) - (s1.x + this._getCenter(s1, s1.width, "x")),
          vy = (s2.y + this._getCenter(s2, s2.height, "y")) - (s1.y + this._getCenter(s1, s1.height, "y"));
      return Math.sqrt(vx * vx + vy * vy);
    }
  
   
  
    /*
    Line of sight
    ------------
  
    The `lineOfSight` method will return `true` if there’s clear line of sight 
    between two sprites, and `false` if there isn’t. Here’s how to use it in your game code:
  
        monster.lineOfSight = gu.lineOfSight(
            monster, //Sprite one
            alien,   //Sprite two
            boxes,   //An array of obstacle sprites
            16       //The distance between each collision point
        );
  
    The 4th argument determines the distance between collision points. 
    For better performance, make this a large number, up to the maximum 
    width of your smallest sprite (such as 64 or 32). For greater precision, 
    use a smaller number. You can use the lineOfSight value to decide how 
    to change certain things in your game. For example:
  
        if (monster.lineOfSight) {
          monster.show(monster.states.angry)
        } else {
          monster.show(monster.states.normal)
        }
  
    */
  
   function lineOfSight(
      s1, //The first sprite, with `centerX` and `centerY` properties
      s2, //The second sprite, with `centerX` and `centerY` properties
      obstacles, //An array of sprites which act as obstacles
      segment = 32 //The distance between collision points
    ) {
  
    //Calculate the center points of each sprite
    spriteOneCenterX = s1.x + this._getCenter(s1, s1.width, "x");
    spriteOneCenterY = s1.y + this._getCenter(s1, s1.height, "y");
    spriteTwoCenterX = s2.x + this._getCenter(s2, s2.width, "x");
    spriteTwoCenterY = s2.y + this._getCenter(s2, s2.height, "y");
  
    //Plot a vector between spriteTwo and spriteOne
    let vx = spriteTwoCenterX - spriteOneCenterX,
      vy = spriteTwoCenterY - spriteOneCenterY;
  
    //Find the vector's magnitude (its length in pixels)
    let magnitude = Math.sqrt(vx * vx + vy * vy);
  
    //How many points will we need to test?
    let numberOfPoints = magnitude / segment;
  
    //Create an array of x/y points, separated by 64 pixels, that
    //extends from `spriteOne` to `spriteTwo`  
    let points = () => {
  
      //Initialize an array that is going to store all our points
      //along the vector
      let arrayOfPoints = [];
  
      //Create a point object for each segment of the vector and 
      //store its x/y position as well as its index number on
      //the map array 
      for (let i = 1; i <= numberOfPoints; i++) {
  
        //Calculate the new magnitude for this iteration of the loop
        let newMagnitude = segment * i;
  
        //Find the unit vector. This is a small, scaled down version of
        //the vector between the sprites that's less than one pixel long.
        //It points in the same direction as the main vector, but because it's
        //the smallest size that the vector can be, we can use it to create
        //new vectors of varying length
        let dx = vx / magnitude,
          dy = vy / magnitude;
  
        //Use the unit vector and newMagnitude to figure out the x/y
        //position of the next point in this loop iteration
        let x = spriteOneCenterX + dx * newMagnitude,
          y = spriteOneCenterY + dy * newMagnitude;
  
        //Push a point object with x and y properties into the `arrayOfPoints`
        arrayOfPoints.push({
          x, y
        });
      }
  
      //Return the array of point objects
      return arrayOfPoints;
    };
  
    //Test for a collision between a point and a sprite
    let hitTestPoint = (point, sprite) => {
  
      //Find out if the point's position is inside the area defined
      //by the sprite's left, right, top and bottom sides
      let left = point.x > sprite.x,
        right = point.x < (sprite.x + sprite.width),
        top = point.y > sprite.y,
        bottom = point.y < (sprite.y + sprite.height);
  
      //If all the collision conditions are met, you know the
      //point is intersecting the sprite
      return left && right && top && bottom;
    };
  
    //The `noObstacles` function will return `true` if all the tile
    //index numbers along the vector are `0`, which means they contain 
    //no obstacles. If any of them aren't 0, then the function returns
    //`false` which means there's an obstacle in the way 
    let noObstacles = points().every(point => {
      return obstacles.every(obstacle => {
        return !(hitTestPoint(point, obstacle))
      });
    });
  
    //Return the true/false value of the collision test
    return noObstacles;
    }
  