
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

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer = PIXI.autoDetectRenderer(
		{
      view:document.getElementById("game-canvas")
    }
	);


loader
  .add(["images/background.png", "images/towerDefense_tile206.png", "images/towerDefense_tile180.png", "images/cat.png", "images/towerDefense_tile251.png", "images/towerDefense_tile024.png", "images/towerDefense_tile034.png"])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: ", resource.name, resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}

//Define any variables that are used in more than one function
let wave, state;

function setup() {
  console.log("All files loaded");
  
  //TODO add interaction plugin
  //app.stage.interactive = true;
  //app.stage.on("mousedown", function(e){
  //  console.log("mousedown", e);
  //})

  //Create the `gameScene` group
  gameScene = new Container();
  app.stage.addChild(gameScene);
  gameScene.visible = true
  
  waveScene = new Container();
  app.stage.addChild(waveScene);
  
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
  
  //TODO Make the enemies
  //TODO Create the health bar
  //TODO Add some text for the game over message
  //TODO Create a `gameOverScene` group
  //TODO Assign the player's keyboard controllers
  wave = new Wave(waveScene, 1);
  
  //tower = new Tower();
  towers = new Towers(waveScene);

  //set the game state to `waveLoop`
  state = waveLoop;
 
  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function setupTiles()
{
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      if (map[row][col] === '0')
      {
        var tile = new Tile(col, row)
        gameScene.addChild(tile);
      }
    }
  }
}

function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function waveLoop(delta) {
  //Move the wave
  wave.move(map)
  towers.attack(wave)
}


function endLoop() {
  //All the code that should run at the end of the game
  
}

//Function called from javascript form
function nextWave() {
  console.log("Next Wave");
  //setup the wave
  
  
  //set the game state to `play`
  //state = wave;
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
