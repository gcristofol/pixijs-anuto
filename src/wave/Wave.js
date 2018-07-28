const ENEMY_VELOCITY = 0.9;

class Wave {

  // TODO Make enemies into an array
  // TODO Make enemies into a container
  //enemies = [];
  //enemy;

  constructor(waveScene, mWaveNumber) {
    this.mWaveNumber = mWaveNumber;
    this.enemy = null;

    //this.enemy = new Sprite(resources["images/cat.png"].texture);
    this.enemy = new Enemy(TILE_SIZE * 2 + 1, 0 + 1)

    //Initial Tile
    //this.enemy.x = TILE_SIZE * 2 + 1
    //this.enemy.y = 0 + 1

    //this.enemy.scale.x = .35 //TODO remove when there are proper textures
    //this.enemy.scale.y = .35

    //move down by default until first collision
    this.enemy.vy = ENEMY_VELOCITY
    this.enemy.vx = 0

    waveScene.addChild(this.enemy);
  }

  getWaveNumber() {
    console.log("WaveNumber", this.mWaveNumber);
  }

  move(map) {
    //move the enemy
    this.enemy.y += this.enemy.vy
    this.enemy.x += this.enemy.vx
    
    //TODO check enemy makes it outside the map

    //check if the next move has crossed boundaries
    if (this.contain(this.enemy, map)) {
      console.log("enemy hits wall");
      //determine where to go next
      var col = Math.floor(this.enemy.x / TILE_SIZE);
      var row = Math.floor(this.enemy.y / TILE_SIZE);
      console.log("where to go next...", map[row][col]);
      //TODO do something in case 'F' value (the end is reached)
      switch (map[row][col]) {
        case 'R':
          this.enemy.vy = 0
          this.enemy.vx = ENEMY_VELOCITY
          break;
        case 'D':
          this.enemy.vy = ENEMY_VELOCITY
          this.enemy.vx = 0
          break;
        case 'L':
          this.enemy.vy = 0
          this.enemy.vx = -ENEMY_VELOCITY
          break;
        case 'U':
          this.enemy.vy = -ENEMY_VELOCITY
          this.enemy.vx = 0
          break;
      }
    }
  }

  contain(sprite, map) {
    //if sprite moving down
    var col, row
    if (sprite.vy > 0) {
      col = Math.floor(sprite.x / TILE_SIZE);
      row = Math.floor((sprite.y + sprite.height) / TILE_SIZE);
    } else if (sprite.vx > 0) {
      col = Math.floor((sprite.x + sprite.width) / TILE_SIZE);
      row = Math.floor(sprite.y / TILE_SIZE);
    } else if (sprite.vx < 0) {
      col = Math.floor((sprite.x - 1) / TILE_SIZE);
      row = Math.floor(sprite.y / TILE_SIZE);
    }else if (sprite.vy < 0) {
      col = Math.floor(sprite.x / TILE_SIZE);
      row = Math.floor((sprite.y - 1) / TILE_SIZE);
    }

    return map[row][col] === '0'
  }
  
  head() {
    //TODO Return different enemies depending on the strategy selected on the tower
    return this.enemy;
  }

}

class Enemy extends PIXI.Container{
  constructor(x, y) {
    super()
    this.position.x = x
    this.position.y = y

    var childSprite = new Sprite(resources["images/cat.png"].texture);
    childSprite.scale.x = .35
    childSprite.scale.y = .35
    
    childSprite.position.x = 5
    childSprite.position.y = 5

    var rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x89a4a6);
    rectangle.drawRect(0, 0, TILE_SIZE, TILE_SIZE);
    rectangle.endFill();
    
 
    this.addChild(rectangle)
    this.addChild(childSprite)
  }
}