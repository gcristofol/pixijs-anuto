
class Towers {

  //TODO Use an array of towers
  constructor(waveScene) {
    this.towers = [];
    this.towers.push(new BasicTower(2, 6));
    //this.towers.push(new AnimatedTower(4, 8));
    for(var i=0; i < this.towers.length; i++){
      waveScene.addChild(this.towers[i]);
    }
  }

  attack(wave) {
    //TODO find enemy accoding to strategy: first, weakest, etc...
    
    //Make the towers aim and shoot the enemy
    for(var i=0; i < this.towers.length; i++){
      this.towers[i].attack(wave.head())
    }
  }

}
