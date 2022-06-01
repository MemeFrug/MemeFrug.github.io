let currentLevelIndex = 0
let showingYouDieScreen = false
let textShowing = ""
let nameShowing = "???"

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.controls = true;
    document.body.appendChild(this.sound);
    this.changeSource = function(src) {
        this.sound.src = src;
        console.log(this.sound);
        console.log(this.sound.loop);
    }
    this.changeVolume = (volume) => {
        this.sound.volume = volume;
    }
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
    this.loop = function(){
        this.sound.loop = !this.sound.loop
        console.log(this.sound.loop);
    }
    this.changePlaybackRate = function(rate) {
        this.sound.playbackRate = rate
    }
  }

const music = new sound("./assets/background1.mp3")
music.changeVolume(0.5)
music.loop()

function setup() {
    const player = new Player(false, 0, 10, 90, 190)
    player.c = "red"
    // player.setImg("./assets/evil nuthead.gif", false);

    // player.gravityMax = -1000
    player.jump_strength = -860
    player.speed = 500
    
    ENGINE.Config.cameraFollowSpeed = 10
    ENGINE.Config.gravity = 3500
    ENGINE.Config.sideScroller = true
    ENGINE.Config.cameraScale = 1
    ENGINE.addPlayer(player, true)
    ENGINE.drawLoop.splice(ENGINE.drawLoop.indexOf(player), 1)

    // addEngineEvent(Enum.Events.Pressed.)

    WORLD.blockSize = 100

    STATS.new().autoLoad()

    getElementById("playButton").onclick = async () => {
        getElementById("MainMenu").style.display = "none"
        getElementById("LoadingScreen").style.display = "flex"
        await loadLevel(Levels[0])
        getElementById("LoadingScreen").style.display = "none"
        createCanvas(true)
        setCanvasBackground("white")
        music.play()

        await showText("???", "Woah, Where am i?")
        await sleep(100)
        await showText("David", "Oh... I did'nt see you there, my names David!")
        await sleep(100)
        await showText("David", "Whats yours??")
        await sleep(500)
        await showText("David", "....")
        await sleep(100)
        await showText("David", "Not very talkative huh?")
        await sleep(100)
        await showText("David", "I have a feeling that we need to reach the top of this tower.")
    }
}

function showText(name, text) {
    return new Promise(async (resolve, reject) => {
        nameShowing = name
        textShowing = ""
        for (let i = 0; i < text.length; i++) {
            const element = text[i];
            // const SansAudio = new Audio("./Assets/snd_txtsans.wav")
            // SansAudio.volume = 0.3
            // SansAudio.play()
            textShowing += element
            if (element == ",") {
                await sleep(500)
            } else if (element == "?") {
                await sleep(700)
            } else if (element == "!") {
                await sleep(300)
            } else if (element == ".") {
                await sleep(700)
            }else {
                await sleep(40)
            }
        }
        resolve()
    });
}

//TODO Add event listeners uwu
function update(deltaTime) {
    const player = ENGINE.GetLocalPlayer()
    if (ENGINE.InputHandler.keys_down.w) player.move('w'); // Move the player
	else player.stopMove("w")
	if (ENGINE.InputHandler.keys_down.a) player.move('a');
	else player.stopMove("a")
	if (ENGINE.InputHandler.keys_down.d) player.move('d');
	else player.stopMove("d")

    // if (ENGINE.InputHandler.keys_down.W) player.move('w'); // Move the player
	// else player.stopMove("w")
	// if (ENGINE.InputHandler.keys_down.A) player.move('a');
	// else player.stopMove("a")
	// if (ENGINE.InputHandler.keys_down.D) player.move('d');
	// else player.stopMove("d")

    if (player.y > Levels[currentLevelIndex].length * WORLD.blockSize - 3000) {
        console.log("u die");
        showingYouDieScreen = true
    }
}

function afterDraw(ctx) {
    const player = ENGINE.GetLocalPlayer()   
    
    //Draw The Player TEST
    player.Draw(ctx)

    const mousepos = ENGINE.getMousePosition()

    ctx.fillRect(mousepos.x, mousepos.y, 5, 5)
}

function drawUI(ctx) {
    if (showingYouDieScreen) {
        fillRect(0, 0, ENGINE.Config.nativeWidth, ENGINE.Config.nativeHeight, "black")
        ctx.fillStyle = "red"
        ctx.font = "100px Arial";
        fillText("u dye", ENGINE.Config.nativeWidth / 2 - 150, ENGINE.Config.nativeHeight / 2)
    }


    ctx.globalAlpha = 0.8
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.3, ENGINE.Config.nativeWidth / 2, 200)
    // ctx.strokeStyle = "white"
    // ctx.lineWidth = 9
    // ctx.strokeRect(ENGINE.Config.nativeWidth / 4, ENGINE.Config.nativeHeight / 1.6, ENGINE.Config.nativeWidth / 2, 300)
    ctx.fillStyle = "rgb(216, 216, 216)"
    ctx.font = "40px DTM-Sans"
    fillText(nameShowing + ": ", 550, ENGINE.Config.nativeHeight / 1.2)
    fillText(textShowing, 760, ENGINE.Config.nativeHeight / 1.2, 650, 40)
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
            {name: "stairs", asset: "./Assets/stairs.png", dataValue: 4, noCollision: true},
            {name: "stairsReversed", asset: "./Assets/stairsReversed.png", dataValue: 5, noCollision: true},
            {name: "stairsUpsidedown", asset: "./Assets/stairsUpsidedown.png", dataValue: 6, noCollision: true},
            {name: "stairsUpsidedownReversed", asset: "./Assets/stairsUpsidedownReversed.png", dataValue: 7, noCollision: true},
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
                        // resolve();
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