
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
);

//app.renderer.view.style.position = "absolute";
//app.renderer.view.style.display = "block";
//app.renderer.autoResize = true;
app.renderer = PIXI.autoDetectRenderer(
      320,
      500,
      {
      view:document.getElementById("game-canvas")
    }
	);


loader.add(["images/background.png", "images/missile_tower.png", "images/tower_base.png", "images/cat.png", "images/bullet.png", "images/green_tile.png", "images/asfalt_tile.png"])
loader.on("progress", loadProgressHandler)
loader.load(setup);

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: ", resource.name, resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}

//Define any variables that are used in more than one function
let waveNum = 0;
let state, tiles;


function setup() {
  console.log("All files loaded");

  //Create the `gameScene` group
  gameScene = new Container();
  app.stage.addChild(gameScene);
  gameScene.visible = true

  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;

  //Draw map: design pourposes only
  //drawMap()

  //Setup Map Background
  background = new Sprite(resources["images/background.png"].texture);
  background.scale.x = .5
  background.scale.y = .5
  gameScene.addChild(background);
  setupTiles()
 
  //TODO setup towers via mouse interaction
  towers = new Towers(gameScene);

  //set the game state to `idleLoop` click next for `waveLoop`
  state = idleLoop;
 
  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function setupTiles()
{
  tiles = new Container();
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      if (map[row][col] === '0')
      {
        var tile = new Tile(col, row)
        tiles.addChild(tile);
      }
    }
    gameScene.addChild(tiles);
  }
}

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

function idleLoop(delta) {
  //Don't Move the wave
  //Just interactive upgrade towers
}

function waveLoop(delta) {
  var currentTime = performance.now()
  //Move the wave
  wave.move(map, currentTime)
  
  //Let the towers attack the enemy
  towers.attack(wave, currentTime)
  
  wave.cleanup(currentTime)
  
}

function endLoop() {
  //All the code that should run at the end of the game
  //game over
}

//Function called from javascript form
function nextWaveClick() {
  waveNum++
  console.log("Next Wave", waveNum);
  
  //setup the wave
  wave = new Wave(gameScene, waveNum);
  
  //set the game state to `play`
  state = waveLoop;
}


class Tile extends PIXI.Container {

  constructor(col, row) {
    super()
    this.x = TILE_SIZE * col
    this.y = TILE_SIZE * row
    
    var rect = new PIXI.Graphics();
    rect.beginFill(0xFFFFFF);
    rect.drawRect(0, 0, TILE_SIZE, TILE_SIZE);
    rect.endFill();
    rect.alpha = 0;
    rect.interactive = true;
    rect.hitArea = new PIXI.Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
    rect.on('mousedown', onMousedown)
    rect.on('mouseover', onMouseover)
    rect.on('mouseout', onMouseout)
    this.addChild(rect);
  }
}

function onMousedown (event) {
  //TODO Clavar tower seleccionada en el formulari de arriba
  console.log('mousedown tile', this)
}

function onMouseover(mouseData) {
  this.alpha = 0.3;
}

// make circle half-transparent when mouse leaves
function onMouseout(mouseData) {
  this.alpha = 0;
}