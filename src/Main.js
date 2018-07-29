
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
  //app.stage.interactive = true;
  //app.stage.on("mousedown", function(e){
  //  console.log("mousedown", e);
  //})

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
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      if (map[row][col] === '0')
      {
        //let sprite =  new PIXI.Sprite(PIXI.utils.TextureCache["images/towerDefense_tile024.png"]);
        let container = new PIXI.Container()
        container.x = TILE_SIZE  * col
        container.y = TILE_SIZE * row
        //container.scale.x = .5
        //container.scale.y = .5
   
        
        var rect = new PIXI.Graphics();
        //circle.lineStyle(5, 0xFFFFFF, 1);
        //rect.lineStyle(1, 0xFFFFFF, 3);
        rect.beginFill(0x33cc33);
        rect.drawRect(0, 0, TILE_SIZE, TILE_SIZE);
        rect.alpha = 0.5;
        rect.beginFill(0x0000FF, 1);
        //circle.drawCircle(0, 0, TILE_SIZE);
        rect.endFill();
        rect.interactive = true;
        rect.hitArea = new PIXI.Circle(0, 0, TILE_SIZE - 2 );

        rect.mouseover = onMouseover;
        
        
        container.addChild(rect);
        gameScene.addChild(container);
      }
    }
  }
  
}

function onMouseover (mouseData) {
  console.log('mouseover')
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