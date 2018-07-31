const ENEMY_VELOCITY = 4;

class Wave {

  // TODO Make enemies into an array
  // TODO Make enemies into a container
  //enemies = [];
  //enemy;

  constructor(waveScene, mWaveNumber) {
    this.b = new Bump(PIXI);
    this.mWaveNumber = mWaveNumber;
    this.enemy = null;

    //this.enemy = new Sprite(resources["images/cat.png"].texture);
    this.enemy = new Enemy(TILE_SIZE * 2 + 1, 0 + 1)

    //move down by default until first collision
    this.enemy.vy = ENEMY_VELOCITY
    this.enemy.vx = 0

    waveScene.addChild(this.enemy);
  }

  getWaveNumber() {
    console.log("WaveNumber", this.mWaveNumber);
  }

  move(map) {
    //TODO limit next move to distance to wall

    //move the enemy(s)
    this.enemy.y += this.enemy.vy
    this.enemy.x += this.enemy.vx

    //check if the move is out of bounds
    var col = Math.floor(this.enemy.x / TILE_SIZE);
    var row = Math.floor(this.enemy.y / TILE_SIZE);

    if (typeof map[row] != 'undefined' && typeof map[row][col] != 'undefined' && map[row][col]==='F'){
      console.log("enemy reaches the end"); 
      //TODO remove enemy update lives...
      this.enemy.visible = false
      this.enemy = null
    }
    else if (this.enemy.isContained(map)) {
      console.log("enemy hits a wall");
      //determine where to go next by reading the map
      this.enemy.turnTo(map[row][col]);
    }
  }
  
  head() {
    //TODO Return different enemies depending on the strategy selected on the tower
    return this.enemy;
  }

}
