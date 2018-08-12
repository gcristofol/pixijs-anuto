const ENEMY_VELOCITY = 3;

// Amount of hits a ship can take before it explodes
const MAX_DAMAGE = 3;
const INDICATOR_LINE_THICKNESS = 3

const DEAD_HIGHLIGHT_DURATION = 140;
const TINT = 0xFF6600;

const ENUM_STATUS_ALIVE = 0,
      ENUM_STATUS_DYING  = 1,
      ENUM_STATUS_DEAD  = 2,
      ENUM_STATUS_OUT_OF_BOUNDS = 3;
      


class Enemy extends PIXI.Container {
    
  constructor(gameScene) {
    super()
    //move down by default until first collision
    gameScene.addChild(this);
    
    this.vy = ENEMY_VELOCITY
    this.vx = 0
    
    this.state = ENUM_STATUS_ALIVE;
    this._damage = 0
    this._hitHighlightStart = null;
    

    this.position.x = STARTING_X
    this.position.y = STARTING_Y

    this._body = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
    this._body.scale.x = .35//TODO remove when scaled proper
    this._body.scale.y = .35

    this._body.position.x = 5
    this._body.position.y = 5

    this._healthIndicator = new PIXI.Graphics();
    this._healthIndicator.lineStyle(INDICATOR_LINE_THICKNESS, 0x8000);
    this._healthIndicator.drawRect(0, 0, TILE_SIZE, 1);

    this.addChild(this._healthIndicator)
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
      console.log("Enemy reaches the end");
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
  checkHit(bullet, currentTime){
    //console.log("check hit ", bulletPosition, this.position);
    if( hitTestRectangle(this, bullet ) ) {
			
      // Remove decrement health by 1
      console.log("Hit by bullet: Take damage");
      this._damage++;
      
      if (this._damage >= MAX_DAMAGE){
        this._damage = MAX_DAMAGE
        this.state = ENUM_STATUS_DYING;        
        // Ok, we're dead. Flash red
        this._hitHighlightStart = currentTime;
        this._body.tint = TINT;
      }

      //refresh health indicator; add damage
      this._healthIndicator.lineStyle(INDICATOR_LINE_THICKNESS, 0xFF0000);
      this._healthIndicator.drawRect(0, 0, TILE_SIZE * ( this._damage / MAX_DAMAGE ), 1);

			return true
    }
    return false
  }

  cleanup(currentTime){
      if( this._hitHighlightStart && currentTime > this._hitHighlightStart + DEAD_HIGHLIGHT_DURATION ) {
        console.log("Enemy fades away")
        this._hitHighlightStart = null;
        this.visible = false
        this.state = ENUM_STATUS_DEAD;
        gameScene.removeChild(this);
      }
  }
}

