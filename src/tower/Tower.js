const BULLET_SPEED = 7;
const RANGE = 85
// Time that passes between shots
const FIRE_COOLDOWN = 450;

//let gu = new GameUtilities();

class BasicTower extends PIXI.Container {

  constructor(gameScene, col, row) {
    super()
    gameScene.addChild(this)
    this.bullets = [];
    this._timeLastBulletFired = null

    this.gun = new PIXI.Sprite(resources["images/missile_tower.png"].texture);
    this.rectangle = new PIXI.Graphics();

    var x = col * TILE_SIZE
    var y = row * TILE_SIZE

    // move the sprite to the center of the container
    this.gun.position.x = x + TILE_SIZE / 2;
    this.gun.position.y = y + TILE_SIZE / 2;

    this.gun.scale.x = .65
    this.gun.scale.y = .65

    this.addChild(this.gun)

    this.gun.anchor.x = 0.5;
    this.gun.anchor.y = 0.5;
  }

  attack(enemy, currentTime) {
    
    
    // aim: rotate tower
    var dist_Y = enemy.position.y - this.gun.position.y;
    var dist_X = enemy.position.x - this.gun.position.x;
    var angle = Math.atan2(dist_Y, dist_X);
    this.gun.rotation = angle

    // calculate distance
    var dist = distanceBetweenPositions(this.gun.position, enemy.position);
    if (dist < RANGE) {
      this.shoot(currentTime)
    }

    //move the bullets on the array
    //TODO Use bullet manager
    for (var b = 0; b < this.bullets.length; b++) {
      this.bullets[b].position.x += Math.cos(this.bullets[b].rotation) * BULLET_SPEED;
      this.bullets[b].position.y += Math.sin(this.bullets[b].rotation) * BULLET_SPEED;

      //if it touches the enemy it goes away
      if (enemy.checkHit(this.bullets[b], currentTime)) {
        //remove bullet
        console.log("Remove bullet ", b);
        this.bullets[b].visible = false
        this.removeChild(this.bullets[b]);
        var index = this.bullets.indexOf(this.bullets[b]);
        this.bullets.splice(index, 1);
      }
    }
  }


  shoot(currentTime) {
    if(currentTime > this._timeLastBulletFired + FIRE_COOLDOWN ) {
      var bullet = new PIXI.Sprite(resources["images/bullet.png"].texture);
      bullet.position.x = this.gun.x+TILE_SIZE/2;
		  bullet.position.y = this.gun.y+TILE_SIZE/2;
		  bullet.rotation = this.gun.rotation;;
			this.addChild(bullet);
      this.bullets.push(bullet);
      
			this._timeLastBulletFired = currentTime;
    }
  }


  
}

