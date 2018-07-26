
class Towers {

  //TODO Use an array of towers
  constructor(waveScene) {
    this.tower = new Tower(2, 6);
    waveScene.addChild(this.tower);
  }

  attack(wave) {
    //TODO find enemy accoding to strategy: first, weakest, etc...
    
    //Make the tower aim and shoot the enemy
    this.tower.attack(wave.head())
  }

}
