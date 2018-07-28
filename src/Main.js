
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
    width: 256,
    height: 256,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer = PIXI.autoDetectRenderer(
		window.innerWidth,
		window.innerHeight,
		{view:document.getElementById("game-canvas")}
	);


loader
  .add(["images/background.png", "images/towerDefense_tile206.png", "images/towerDefense_tile180.png", "images/cat.png", "images/towerDefense_tile251.png", "images/towerDefense_tile024.png"])
  .on("progress", loadProgressHandler)
  .load(setup);

//Define any variables that are used in more than one function
//let cat, state;

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
  app.stage.interactive = true;
  app.stage.on("mousedown", function(e){
    console.log("mousedown", e);
  })

  //Create the `gameScene` group
  gameScene = new Container();
  app.stage.addChild(gameScene);
  
  waveScene = new Container();
  app.stage.addChild(waveScene);
  
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;

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
  //let plateauTexture = PIXI.utils.TextureCache["images/towerDefense_tile055.png"];
  //let backgrdTexture = PIXI.utils.TextureCache["images/towerDefense_tile024.png"];

  //plateau = new Sprite(backgrdTexture);
  //plateau.x = 0;
  //plateau.y = 0;
  //plateau.width  = TILE_SIZE;
  //plateau.height = TILE_SIZE;
    
  var x,y = 0;
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      if (map[row][col] === '0'){
        y = TILE_SIZE * row
        x = TILE_SIZE  * col
        let sprite =  new PIXI.Sprite(PIXI.utils.TextureCache["images/towerDefense_tile024.png"]);
        sprite.x = x
        sprite.y = y
        sprite.scale.x = .5 
        sprite.scale.y = .5
        gameScene.addChild(sprite);
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