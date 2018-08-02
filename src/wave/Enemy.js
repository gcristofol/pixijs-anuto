const ENEMY_VELOCITY = 1;

// Amount of hits a ship can take before it explodes
const MAX_HEALTH = 10;


const ENUM_STATUS_ALIVE = 0,
      ENUM_STATUS_DEAD  = 1,
      ENUM_STATUS_OUT_OF_BOUNDS = 2;
      

class Enemy extends PIXI.Container {
    
  constructor(gameScene) {
    super()
    //move down by default until first collision
    gameScene.addChild(this);
    
    this.vy = ENEMY_VELOCITY
    this.vx = 0
    
    this.state = ENUM_STATUS_ALIVE;
    this._health = MAX_HEALTH
    
    this._hitHighlightStart = null;

    this.position.x = STARTING_X
    this.position.y = STARTING_Y

    this._body = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
    this._body.scale.x = .35//TODO remove when scaled proper
    this._body.scale.y = .35

    this._body.position.x = 5
    this._body.position.y = 5

//this.hitArea = new PIXI.Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
    var rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xFF5733, 3);
    rectangle.drawRect(0, 0, TILE_SIZE, TILE_SIZE);

    this.addChild(rectangle)
    this.addChild(this._body)
  }
    
  move(map) {
    //TODO limit next move to distance to wall

    //move the enemy(s)
    this.y += this.vy
    this.x += this.vx

    //check if the move is out of bounds
    //TODO use PIXI.Point
    var col = Math.floor(this.x / TILE_SIZE);
    var row = Math.floor(this.y / TILE_SIZE);

    if (typeof map[row] != 'undefined' && typeof map[row][col] != 'undefined' && map[row][col]==='F')
    {
      console.log("enemy reaches the end");
      //TODO remove enemy from wave, update lives, etc
      this.visible = false
      this.state = ENUM_STATUS_OUT_OF_BOUNDS;
      
    }
    else if (this.isContained(map)) {
      //console.log("enemy hits a wall");
      //determine where to go next by reading the map
      this.turnTo(map[row][col]);
    }
    return this.status
  }



  isContained(map) {
      //check if the next cell in the direction of movement is a wall
      var col, row
      if (this.vy > 0) {
          col = Math.floor(this.x / TILE_SIZE);
          row = Math.floor((this.y + this.height + ENEMY_VELOCITY) / TILE_SIZE);
      } else if (this.vx > 0) {
          col = Math.floor((this.x + this.width + ENEMY_VELOCITY) / TILE_SIZE);
          row = Math.floor(this.y / TILE_SIZE);
      } else if (this.vx < 0) {
          col = Math.floor((this.x - ENEMY_VELOCITY) / TILE_SIZE);
          row = Math.floor(this.y / TILE_SIZE);
      } else if (this.vy < 0) {
          col = Math.floor(this.x / TILE_SIZE);
          row = Math.floor((this.y - ENEMY_VELOCITY) / TILE_SIZE);
      }

      //check if it is a wall, value 0 on the map.
      return map[row][col] === '0'
  }

  turnTo(direction) {
    switch (direction) {
        case 'R':
            console.debug("enemy turns right");
            this.vy = 0
            this.vx = ENEMY_VELOCITY
            break;
        case 'D':
            console.debug("enemy moves down");
            this.vy = ENEMY_VELOCITY
            this.vx = 0
            break;
        case 'L':
            console.debug("enemy turns left");
            this.vy = 0
            this.vx = -ENEMY_VELOCITY
            break;
        case 'U':
            console.debug("enemy goes up");
            this.vy = -ENEMY_VELOCITY
            this.vx = 0
            break;
        case 'F':
            console.debug("enemy is out of bounds");
            break;
    }
  }
  
  /**
	 * Check if enemy was hit by a bullet
	 *
	 * @param   {PIXI.Point} bulletPosition
	 *
	 * @public
	 * @returns {Boolean} wasHit
	 */
  checkHit(bullet){
    //console.log("check hit ", bulletPosition, this.position);
    if( hitTestRectangle(this, bullet ) ) {
      console.log("Take damage to enemy ");
   
			// Ok, we're hit. Flash red
			this._hitHighlightStart = performance.now();
			
			// Remove decrement health by 1
			this._health--;
			return true
    }
    return false
  }
}

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