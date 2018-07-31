
class Enemy extends PIXI.Container {
    constructor(x, y) {
        super()
        this.position.x = x
        this.position.y = y

        var childSprite = new Sprite(resources["images/cat.png"].texture);
        childSprite.scale.x = .35//TODO remove when scaled proper
        childSprite.scale.y = .35

        childSprite.position.x = 5
        childSprite.position.y = 5

        var rectangle = new PIXI.Graphics();
        rectangle.lineStyle(1, 0xFF5733, 3);
        rectangle.drawRect(0, 0, TILE_SIZE, TILE_SIZE);

        this.addChild(rectangle)
        this.addChild(childSprite)
    }


    isContained(map) {
        //check if the next cell in the direction of movement is a wall
        var col, row
        if (this.vy > 0) {
            col = Math.floor(this.x / TILE_SIZE);
            row = Math.floor((this.y + this.height + ENEMY_VELOCITY) / TILE_SIZE);
        } else if (this.vx > 0) {
            col = Math.floor((this.x + this.width + ENEMY_VELOCITY) / TILE_SIZE);
            row = Math.floor(this.y / TILE_SIZE);
        } else if (this.vx < 0) {
            col = Math.floor((this.x - ENEMY_VELOCITY) / TILE_SIZE);
            row = Math.floor(this.y / TILE_SIZE);
        } else if (this.vy < 0) {
            col = Math.floor(this.x / TILE_SIZE);
            row = Math.floor((this.y - ENEMY_VELOCITY) / TILE_SIZE);
        }

        //check if it is a wall, value 0 on the map.
        return map[row][col] === '0'
    }

    turnTo(direction) {
        switch (direction) {
            case 'R':
                console.debug("enemy turns right");
                this.vy = 0
                this.vx = ENEMY_VELOCITY
                break;
            case 'D':
                console.debug("enemy moves down");
                this.vy = ENEMY_VELOCITY
                this.vx = 0
                break;
            case 'L':
                console.debug("enemy turns left");
                this.vy = 0
                this.vx = -ENEMY_VELOCITY
                break;
            case 'U':
                console.debug("enemy goes up");
                this.vy = -ENEMY_VELOCITY
                this.vx = 0
                break;
            case 'F':
                console.debug("enemy is out of bounds");
                break;
        }
    }
}