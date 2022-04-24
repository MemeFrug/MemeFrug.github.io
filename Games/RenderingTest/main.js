
const player = new Player(false, 0, 10, 50, 50, 100, 500, -650);
player.c = "red" // Set the colour of the player from default: black to red
ENGINE.Config.TooSmallScreen = document.getElementById("Screen-Too-Small-Element")
ENGINE.Config.sideScroller = true // Sets The Camera To Be Moveable
ENGINE.addPlayer(player, true)

let stats;

//Generate World
function GenerateWorld() {
    return new Promise((resolve, reject) => {
        WORLD.ChangeWorldSize(2000, 2000) // was 10000, 40000

        //Create the first block
        var lastblockPos = {i: 20, j: 0}

        function GenerateTerrainUnder() {
            // if (WORLD.checkTile(lastblockPos)) {
            //     WORLD.checkTile(lastblockPos).h = ((WORLD.data.length - 1) - (lastblockPos.i + 1)) * 50
            // }
            for (let ij = lastblockPos.i + 1; ij < WORLD.data.length; ij++) {
                WORLD.setTile({i: ij, j: lastblockPos.j}, new Square(true, lastblockPos.j * 50, ij * 50, 50, 50))
            }
        }

        for (let i = 0; i < WORLD.data[0].length; i++) {
            const upordown = _GetRndInteger(0, 3);
            if (upordown == 0 || upordown == 1) { // straight
                WORLD.setTile(lastblockPos, new Square(true, lastblockPos.j * 50, lastblockPos.i * 50, 50, 50))
                GenerateTerrainUnder()
            }
            if (upordown == 2 && WORLD.checkTile({i: lastblockPos.i + 1, j: lastblockPos.j}) == undefined) { // down
                lastblockPos.i += 1
                WORLD.setTile(lastblockPos, new Square(true, lastblockPos.j * 50, lastblockPos.i * 50, 50, 50))
                GenerateTerrainUnder()
            }
            if (upordown == 3 && WORLD.checkTile({i: lastblockPos.i - 1, j: lastblockPos.j}) == undefined) { // up
                lastblockPos.i -= 1
                WORLD.setTile(lastblockPos, new Square(true, lastblockPos.j * 50, lastblockPos.i * 50, 50, 50))
                GenerateTerrainUnder()
            } else {
                console.warn("Tile did not exist");
            }

            lastblockPos.j += 1
        }
        resolve()
    })
}

function draw(ctx) {
    ctx.scale(0.8, 0.8)
    let x = 0;
    let y = 1;

    // for (let i = 0; i < WORLD.data.length; i++) {
    //     x = 0;

    //     for (let j = 0; j < WORLD.data[i].length; j++) {
    //         ctx.strokeRect(x, y, 50, 50)
    //         x += 50;
    //     }

    //     y += 50;
    // }

    // ENGINE.VARIABLES.Cam.x = i -= 10
}

function update(deltaTime) {
	const LocalPlayer = ENGINE.GetLocalPlayer()
    if (ENGINE.InputHandler.keys_down.w) LocalPlayer.move('w'); // Move the player
	else LocalPlayer.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) LocalPlayer.move('a');
	else LocalPlayer.stopMove("a")
	if (ENGINE.InputHandler.keys_down.s) LocalPlayer.move('s');
	else LocalPlayer.stopMove("s")
	if (ENGINE.InputHandler.keys_down.d) LocalPlayer.move('d');
	else LocalPlayer.stopMove("d")
}

function setupGame() {
    createCanvas(true, Enum.ResizeType.AspectRatio)
    setCanvasBackground("#2fa3b5")

    WORLD.init()
    GenerateWorld()
}

function setup() {
    stats = new Stats();
    stats.autoLoad()

    document.getElementById("PlayButtonElement").addEventListener("mouseup", () => {
        document.getElementById("MainMenu").style.display = "none"
        setupGame()
    })
}