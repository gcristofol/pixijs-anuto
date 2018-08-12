


class Wave {

  constructor(gameScene, mWaveNumber) {
    this.b = new Bump(PIXI);
    this.mWaveNumber = mWaveNumber;
    this.enemies = [];

    this.enemies.push(new Enemy(gameScene))

    

  }

  move(map, currentTime) {
    this.enemies.forEach((e) => {
      e.move(map, currentTime)
    })
    
  }
  
  cleanup(currentTime){
    this.enemies.forEach((e) => {
      if (e.state === ENUM_STATUS_DYING){
        e.cleanup(currentTime)
      }
      if (e.state === ENUM_STATUS_OUT_OF_BOUNDS || e.state === ENUM_STATUS_DEAD){
        var index = this.enemies.indexOf(e);
        if (index > -1) {
          this.enemies.splice(index, 1);
        }
      }
    })
  }

  head() {
    //TODO Return different enemies depending on the strategy selected on the tower
    return this.enemies[0];
  }
  
  isEmpty() {
    //TODO Return different enemies depending on the strategy selected on the tower
    return this.enemies.length === 0;
  }

}