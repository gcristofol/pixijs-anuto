
const TILE_SIZE  = 32;

const STARTING_X = TILE_SIZE * 2 + 1
const STARTING_Y = 0 + 1


const map =
[
	['0', '0', 'X', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', 'X', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', 'R', 'X', 'X', 'X', 'X', 'X', 'D', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0', 'X', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0', 'X', '0'],
	['0', 'R', 'X', 'D', '0', '0', '0', '0', 'X', '0'],
	['0', 'X', '0', 'X', '0', '0', '0', '0', 'X', '0'],
	['0', 'U', 'X', 'X', 'X', 'X', 'X', 'X', 'L', '0'],
	['0', '0', '0', 'X', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', 'X', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', 'X', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', 'R', 'X', 'X', 'X', 'D', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', 'X', '0', '0'],
	['0', 'D', 'X', 'X', 'X', 'X', 'X', 'L', '0', '0'],
	['0', 'X', '0', '0', '0', '0', '0', '0', '0', '0'],
	['0', 'F', '0', '0', '0', '0', '0', '0', '0', '0'],
	['0', 'F', '0', '0', '0', '0', '0', '0', '0', '0'],
];

//TODO return the col,row on the map for a particular point
function coordinatesToCell(pos1){
  return null;
}

//This function draws the entire map
//Used during design time to scaffold the scenarios
function drawMap()
{
  var sprite;
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      if (map[row][col] === '0'){
         sprite =  new PIXI.Sprite(PIXI.utils.TextureCache["images/green_tile.png"]);
      }else{
         sprite =  new PIXI.Sprite(PIXI.utils.TextureCache["images/asfalt_tile.png"]);
      }
      sprite.x = TILE_SIZE * col
      sprite.y = TILE_SIZE * row
      gameScene.addChild(sprite);
    }
  }
}