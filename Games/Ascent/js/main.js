const player = new Player(false, 0, 10, 150, 280);

let x = 100

function setup() {
    STATS.new().autoLoad()

    createCanvas(true,)
    setCanvasBackground("white")

    player.gravityMax = -1000
    player.jump_strength = -1000
    player.speed = 1000
    
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








// Custom Move Code the incorporate the 's' key
player.move = (movement) => {
    switch (movement) { // Make a switch statement
        case "w":
            player.vy = -player.speed // set the vertical velocity to jump
            break;

        case "a":
            player.vx = -player.speed // Make the speed negative to it goes the opposite way (-x)
            break;

        case "d":
            player.vx = player.speed // Make the x velocity positive of the speed so it goes right
            break;

        case "s":
            player.vy = player.speed
    }
}
// Custom Stop Moving Code, to incorporate the 's' key and to make the 'w' key incorporate the 's' key aswell
player.stopMove = (movement) => {
    switch (movement) {
        case "w":
            if (!ENGINE.InputHandler.keys_down.s)
                player.vy = 0
            else
                player.move("s")
            break;
        case "a":
            if (!ENGINE.InputHandler.keys_down.d)
                player.vx = 0;
            else
                player.move("d")
            break;

        case "d":
            if (!ENGINE.InputHandler.keys_down.a)
                player.vx = 0;
            else
                player.move("a")
            break;

        case "s":
            if (!ENGINE.InputHandler.keys_down.w)
                player.vy = 0
            else
                player.move("w")
            break
    }
}