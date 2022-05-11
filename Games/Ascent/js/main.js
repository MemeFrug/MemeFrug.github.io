const player = new Player(false, 0, 10, 50, 100);

let x = 100

function setup() {
    STATS.new().autoLoad()

    createCanvas(true,)
    setCanvasBackground("white")

    // player.gravityMax = -1000
    player.jump_strength = -1000
    player.speed = 1000
    
    ENGINE.Config.cameraFollowSpeed = 10
    ENGINE.Config.gravity = 1600
    ENGINE.Config.sideScroller = true
    ENGINE.Config.cameraScale = 1
    ENGINE.addPlayer(player, true)
}

function update(deltaTime) {
    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
	else player.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) player.move('a');
	else player.stopMove("a")
	if (ENGINE.InputHandler.keys_down.d) player.move('d');
	else player.stopMove("d")
}

function loadLevel(levelData) {
    
}