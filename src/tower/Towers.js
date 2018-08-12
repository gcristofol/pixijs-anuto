
class Towers {

  //TODO Use an array of towers
  constructor(gameScene) {
    this.towers = [];
    this.towers.push(new BasicTower(gameScene, 2, 6));
    //this.towers.push(new AnimatedTower(4, 8));
    
  }

  attack(wave, currentTime) {
    //TODO find enemy accoding to strategy: first, weakest, etc...
    if (!wave.isEmpty()){
    
      //Make the towers aim and shoot the enemy
      this.towers.forEach((tower) => {
        tower.attack(wave.head(), currentTime)
      })
    }
  }

}
