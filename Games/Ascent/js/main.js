let currentLevelIndex = 0
let showingYouDieScreen = false

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

const music = new sound("./assets/background1.mp3")

function setup() {
    const player = new Player(false, 0, 10, 90, 190)
    player.setImg("./assets/evil nuthead.gif", false);

    // player.gravityMax = -1000
    player.jump_strength = -860
    player.speed = 500
    
    ENGINE.Config.cameraFollowSpeed = 10
    ENGINE.Config.gravity = 3500
    ENGINE.Config.sideScroller = true
    ENGINE.Config.cameraScale = 1
    ENGINE.addPlayer(player, true)

    WORLD.blockSize = 100

    STATS.new().autoLoad()

    getElementById("playButton").onclick = async () => {
        getElementById("MainMenu").style.display = "none"
        getElementById("LoadingScreen").style.display = "flex"
        await loadLevel(Levels[0])
        getElementById("LoadingScreen").style.display = "none"
        createCanvas(true)
        music.play()
        setCanvasBackground("white")
    }
}

function update(deltaTime) {
    const player = ENGINE.GetLocalPlayer()
    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
	else player.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) player.move('a');
	else player.stopMove("a")
	if (ENGINE.InputHandler.keys_down.d) player.move('d');
	else player.stopMove("d")

    if (player.y > Levels[currentLevelIndex].length * WORLD.blockSize - 1500) {
        console.log("u die");
        showingYouDieScreen = true
    }
}

function draw(ctx) {
    strokeRect(0, 0, WORLD.size.w, WORLD.size.h)
}

function afterDraw(ctx) {
    const player = ENGINE.GetLocalPlayer()   
    
    //Draw The Player TEST
    player.Draw(ctx)
}

function drawUI(ctx) {

    if (showingYouDieScreen) {
        fillRect(0, 0, ENGINE.Config.nativeWidth, ENGINE.Config.nativeHeight, "black")
        ctx.fillStyle = "red"
        ctx.font = "100px Arial";
        fillText("u dye", ENGINE.Config.nativeWidth / 2 - 150, ENGINE.Config.nativeHeight / 2)

    }
}

function deleteLevel() {
    return new Promise((resolve, reject) => {
        ENGINE.chunksDrawLoop = []

        for (let i = 0; i < WORLD.tiles.length; i++) {
            const element = WORLD.tiles[i];
            for (let j = 0; j < element.length; j++) {
                WORLD.deleteTile({i:i,j:j})
            }
        }

        resolve()
    });
}

function loadLevel(levelData) {
    return new Promise(async (resolve, reject) => {
        console.log("Loading Level");
        WORLD.init(levelData)
    
        const key = [
            {name: "background", asset: "./Assets/backgroundBrick.png", dataValue: 1, noCollision: true},
            {name: "brick", asset: "./Assets/brick.png", dataValue: 2},
            {name: "spike1", asset: "./Assets/spike1.png", dataValue: 3, noCollision: true},
            {name: "stairs", asset: "./Assets/stairs.png", dataValue: 4},
            {name: "stairsReversed", asset: "./Assets/stairsReversed.png", dataValue: 5},
            {name: "stairsUpsidedown", asset: "./Assets/stairsUpsidedown.png", dataValue: 6},
            {name: "stairsUpsidedownReversed", asset: "./Assets/stairsUpsidedownReversed.png", dataValue: 7},
        ]
    
        for (let i = 0; i < key.length; i++) {
            const element = key[i];
            const tileValue = element.dataValue
            const imageSrc = element.asset

            let x = 0;
            let y = 0;
            for (let i = 0; i < WORLD.data.length; i++) {
                x = 0;
                for (let j = 0; j < WORLD.data[i].length; j++) {
                    if (WORLD.data[i][j] == tileValue) {
                        let square = new Square(true, x, y, WORLD.blockSize, WORLD.blockSize);
                        await square.setImg(imageSrc)

                        if (element.noCollision) square.DisableCollision()

                        WORLD.tiles[i][j] = square;
                    }
                    x += WORLD.blockSize;
                }
                y += WORLD.blockSize;
            }
        }

        resolve()
    });
}